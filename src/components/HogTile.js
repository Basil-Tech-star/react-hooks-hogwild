import React, { useState } from 'react';
import { Card, Button } from 'semantic-ui-react';

const HogTile = ({ hog, toggleHideHog, isHidden }) => {
	const [showDetails, setShowDetails] = useState(false);

	// Handle the toggling of details visibility
	const handleDetailsToggle = () => {
		setShowDetails(!showDetails);
	};

	// Handle the toggling of hide hog visibility
	const handleHideHog = () => {
		toggleHideHog(hog.name); // Hide the hog from the grid
	};

	return (
		<Card 
			style={{
				opacity: isHidden ? 0.5 : 1, // Dimming effect for hidden hogs
				filter: isHidden ? 'grayscale(100%)' : 'none', // Apply grayscale if hidden
			}}
		>
			<Card.Content>
				<Card.Header>{hog.name}</Card.Header>
				<img src={hog.image} alt={hog.name} />
				{/* Show the details if the showDetails state is true */}
				{showDetails && (
					<Card.Description>
						<p>Specialty: {hog.specialty}</p>
						<p>Weight: {hog.weight} kg</p>
						<p>Greased: {hog.greased ? "Yes" : "No"}</p>
						<p>Highest Medal Achieved: {hog["highest medal achieved"]}</p>
					</Card.Description>
				)}
				{/* Display 'Hidden' label if the hog is in the hidden state */}
				{isHidden && <div className="hidden-label">Hidden</div>}
			</Card.Content>
			<Card.Content extra>
				<Button onClick={handleDetailsToggle}>
					{showDetails ? "Hide Details" : "Show Details"}
				</Button>
				<Button color="red" onClick={handleHideHog}>
					Hide Hog
				</Button>
			</Card.Content>
		</Card>
	);
};

export default HogTile;
