import React, {useEffect, useState} from "react";
import {Card, Container, Navbar, Nav, InputGroup, FormControl} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Language from "../hooks/Localization";
import DBLoader from "../hooks/DBLoader";
import AboutArchitect from "./AboutArchitect";
import {ChangeLanguage} from "./Home"
import { HashLink } from "react-router-hash-link";
import uuid from "react-uuid";

export default function Architects() {
	const { t, getCurrLang } = Language();
	const { id } = useParams();

	const [dbLoaded, dbSearchArchitects] = DBLoader("architectShort.json");
	const [searchResult, setSearchResult] = useState(null);
	const [request, setRequest] = useState("");

	useEffect(() => {
		if (dbLoaded === true) {
			setSearchResult(dbSearchArchitects("name." + getCurrLang(), request));
		}
	}, [dbLoaded, request]);

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container className="md">
					<Link className="navbar-brand" to="/">Architects of Belarus</Link>
		  			<Navbar.Toggle aria-controls="basic-navbar-nav" />
		  			<Navbar.Collapse id="basic-navbar-nav">
						{
							id === undefined ? (
								<>
									<Nav className="mr-auto"></Nav>
									<InputGroup className="mr-4" style={{width:"10rem"}}>
										<FormControl
											value={request}
											onChange={e => setRequest(e.target.value)}
											placeholder={t("architects.search")} />
									</InputGroup>
								</>
							):(
								<Nav className="mr-auto">
									<HashLink className="nav-link" smooth to="#photos">{t("architects.photos")}</HashLink>
									<HashLink className="nav-link" smooth to="#bio">{t("architects.bio")}</HashLink>
									<HashLink className="nav-link" smooth to="#video">{t("architects.video")}</HashLink>
									<HashLink className="nav-link" smooth to="#map">{t("architects.map")}</HashLink>
									<Link className="nav-link" to="/architects">{t("navbar.architects")}</Link>
								</Nav>
							)
						}
						<ChangeLanguage/>
		  			</Navbar.Collapse>
				</Container>
			</Navbar>
			<Container className="d-flex justify-content-center flex-wrap">
				{
					id === undefined ? dbLoaded === false ?
					(
						<span>Loading...</span>
					):(
						<ArchitectsList data={searchResult}/>
					):(
						<AboutArchitect id={id}/>
					)
				}
            </Container>
		</>
	);
}

function ArchitectsList(props){
	const { t, getCurrLang } = Language();

	let data = props.data;
	if (data !== null && data.length > 0) {
		let output = [];
		data.forEach(architect => {
			output.push(
    	        <Card className="text-center m-4" style={{ width: '18rem' }} key={uuid()}>
					<Card.Img variant="top" src={architect.photoUrl} />
					<Card.Body>
						<Card.Title>{architect.name[getCurrLang()]}</Card.Title>
						<Card.Subtitle>{architect.dob} - {architect.dod}</Card.Subtitle>
						<Card.Text>
							{architect.description[getCurrLang()]}
						</Card.Text>
						<Link className="btn btn-dark" to={"/architects/" + architect.id}>{t("filling.architectLink")}</Link>
					</Card.Body>
				</Card>
			);
		});
		return(
			<Container className="d-flex justify-content-center flex-wrap">
				{output}
			</Container>
		)
	}else{
		return null;
	}
}