import React from "react";
import {Navbar, Nav, Carousel, Button, Row, Col, Container} from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import Main2 from "../res/main2.jpg";
import Main from "../res/main.jpg";
import KIcon from "../res/kirill.jpg";
import LIcon from "../res/lesha.jpg";
import Language from "../hooks/Localization";
import ArchitectOfDay from "./ArchitectOfDay";
import uuid from "react-uuid";

function InfoBlock(){
	const { t } = Language();
	return(
		<>
			<Carousel>
			  	<Carousel.Item interval={5000} key={uuid()}>
			    	<img
						style={{height: "100vh", objectFit:"cover"}}
			    	  	className="d-block w-100"
			    	  	src={Main}
			    	  	alt="Loading..."
			    	/>
			    	<Carousel.Caption>
			    	  	<h1>{t("filling.infoTitle")}</h1>
						<div style={{fontSize:"2rem", fontWeight:"700"}}>
						  	<p>{t("filling.infoText")}</p>
							<Link className="btn btn-light" to="/architects">{t("filling.infoButton")}</Link>
						</div>
			    	</Carousel.Caption>
			  	</Carousel.Item>
			  	<Carousel.Item interval={5000} key={uuid()}>
			    	<img
						style={{height: "100vh", objectFit:"cover"}}
						className="d-block w-100"
			    		src={Main2}
			    		alt="Loading..."
			    	/>
			    	<Carousel.Caption key={uuid()}>
						<h1>{t("filling.siteDescTitle")}</h1>
						<p style={{fontSize:"2rem", fontWeight:"700"}}>{t("filling.siteDescText")}</p>
			    	</Carousel.Caption>
			  	</Carousel.Item>
			</Carousel>
		</>
	)
}

export function ChangeLanguage(){
	const { getCurrLang, setLang } = Language();
	return(
		<>
			<Button variant="outline-light" 
			onClick={
				()=>{
					setLang(getCurrLang() === "en" ? "ru" : "en");
				}
			}>{getCurrLang()}</Button>
		</>
	)
}

export default function Home() {
	const { t } = Language();
    return ( 
        <> 
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container className="md">
					<Navbar.Brand to="/">Architects of Belarus</Navbar.Brand>
			  		<Navbar.Toggle aria-controls="basic-navbar-nav" />
			  		<Navbar.Collapse id="basic-navbar-nav">
			    		<Nav className="mr-auto">
			    	  		<Link className="nav-link" to="/architects">{t("navbar.architects")}</Link>
							<HashLink className="nav-link" smooth to="#day">{t("navbar.architectOfTheDay")}</HashLink>
							<HashLink className="nav-link" smooth to="#dev">{t("navbar.dev")}</HashLink>
			    		</Nav>
						<ChangeLanguage/>
			  		</Navbar.Collapse>
				</Container>
			</Navbar>
			<InfoBlock/>
			<ArchitectOfDay/>

			<Container id="dev" fluid className="bg-dark d-flex align-items-center h-100">
				<Row className="mt-2">
					<Col md="auto">
						<img
							style={{borderRadius:"50%", objectFit:"cover", width:"64px", height:"64px"}} 
							className="mr-2" 
							src={KIcon} 
							alt=""
						/>
						<a style={{ color: "white", display:"inline-block"}} className="mb-0" href="https://github.com/KaralionakKirill">Karalionak Kirill</a>
					</Col>
					<Col md="auto">
						<img
							style={{borderRadius:"50%", objectFit:"cover", width:"64px", height:"64px"}} 
							className="mr-2" 
							src={LIcon} 
							alt=""
						/>
						<a style={{ color: "white", display:"inline-block"}} className="mb-0" href="https://github.com/GoldenShark3">Aliaksei Vyshamirski</a>
					</Col>
				</Row>
			</Container>
        </>
    )
}