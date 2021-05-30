import React, { useState, useEffect } from "react";
import {Container, Carousel, Row, Col} from "react-bootstrap";
import Language from "../hooks/Localization";
import DBLoader from "../hooks/DBLoader";
import uuid from "react-uuid";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";

export default function AboutArchitect(props){
    const { getCurrLang } = Language();

	const [allLoaded, setAllLoaded] = useState(false);
	const [architect, setArchitect] = useState(null);

	const [shortLoaded, searchShort] = DBLoader("architectShort.json");
	const [longLoaded, searchLong] = DBLoader("architectLong.json");

	useEffect(() => {
		if (shortLoaded === true && longLoaded === true) {
			let short = searchShort("id", parseInt(props.id), true)[0];
			let long = searchLong("id", parseInt(props.id), true)[0];
			if (short !== undefined && long !== undefined) {
                const data = {...short, ...long}
				setArchitect(data);
				setAllLoaded(true);
			} else {
				setAllLoaded(false);
			}
		}
	}, [props.id, shortLoaded, longLoaded]);

	function getPhotos() {
		let result = [];
		architect.photos.forEach(ph => {
			result.push(
				<Carousel.Item key={uuid()}>
                    <img
						style={{height: "100vh", objectFit:"cover"}}
						className="d-block w-50 m-auto"
			    		src={ph}
			    		alt="Loading"
			    	/>
				</Carousel.Item>
			);
		})
		return result;
	}

    function getBio() {
		let res = [];
		architect.bio.forEach(b => {
			res.push(
				<TimelineItem key={uuid()} dateText={b.date}>
					<h3>{b.title[getCurrLang()]}</h3>
					<p>{b.text[getCurrLang()]}</p>
				</TimelineItem>
			);
		});
		return res;
	}

	return (
		<>
			{
				allLoaded === true ? (
					<>
						<Container className="mb-4 mt-4">
							<Row>
								<Col md="4" style={{height: "400px"}}>
									<img 
                                        className="w-100 h-100" 
                                        style={{objectFit: "cover", objectPosition: "top"}} 
                                        src={architect.photoUrl} alt="avatar" 
                                    />
								</Col>
								<Col md="8">
									<h3>{architect.name[getCurrLang()]}</h3>
									<h4>{architect.dob} - {architect.dod}</h4>
									<p>{architect.longDescription[getCurrLang()]}</p>
								</Col>
							</Row>
						</Container>

						<Container id="photos" className="mb-4">
							<Carousel>
								{getPhotos()}
							</Carousel>
						</Container>

						
						<Container id="bio">
							<Timeline lineColor="#ddd">
								{getBio()}
							</Timeline>
						</Container>

						<Container id="video" style={{ height: "60vh" }} className="mb-5">
							<iframe className="w-100 h-100" src={"https://www.youtube.com/embed/" + architect.video} title="video" allowFullScreen></iframe>
						</Container>

						<Container id="map" style={{ height: "60vh" }} className="mb-5">
							<iframe className="w-100 h-100" src={"https://www.google.com/maps/embed?pb=" + architect.location} title="location" style={{ border: 0 }} loading="lazy"></iframe>
						</Container>
					</>
				) : (
					<h1>Loading...</h1>
				)
			}
		</>
	);
}