import React, { useState, useEffect } from "react";
import {Container, Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import Language from "../hooks/Localization";
import DBLoader from "../hooks/DBLoader";

export default function ArchitectOfDay(){
    const { t, getCurrLang } = Language();
	
	const [ dbLoaded, dbSearchArchitects ] = DBLoader("architectShort.json");
	const [ architect, setArchitect ] = useState(null);

	useEffect(() => {
		const random = (max) =>{
			return Math.floor(Math.random() * max);
		}

		if (dbLoaded === true) {
			let architects = dbSearchArchitects();
			let id = random(architects.length);
			setArchitect(architects[id]);
		}
	}, [dbLoaded, dbSearchArchitects]);

    return(
		<Container id="day" fluid className="d-flex flex-column justify-content-center align-items-center mt-4 mb-4">
			{
				dbLoaded === true && architect !== null ? (
					<>
						<h2>{t("filling.architectOfTheDay")}</h2>
						<Card className="text-center" style={{ width: '18rem' }}>
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
					</>
				) : (
					<span>Loading</span>
				)
			}

		</Container >
	)
}