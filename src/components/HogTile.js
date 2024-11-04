import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';

const HogTile = ({ hog, toggleHideHog }) => {
	const [showDetails, setShowDetails] = useState(false);


    const handleHide = () => {
		toggleHideHog(hog.name);
	};

	const handleClick = () => {
		setShowDetails(!showDetails);
	};

    



	return (
		<Card onClick={handleClick} className="ui eight wide column">
			<Card.Content>
				<Card.Header>{hog.name}</Card.Header>
				<img src={hog.image} alt={hog.name} />
				{showDetails && (
					<Card.Description>
						<p>Specialty: {hog.specialty}</p>
						<p>Weight: {hog.weight} kg</p>
						<p>Greased: {hog.greased ? "Yes" : "No"}</p>
						<p>Highest Medal Achieved: {hog["highest medal achieved"]}</p>
					</Card.Description>
				)}
			</Card.Content>
            <Card.Content extra>
				<Card.Content onClick={handleHide}>
					{toggleHideHog ? "Show" : "Hide"} Hog
				</Card.Content>
			</Card.Content>
		</Card>
	);
};
export default HogTile;
