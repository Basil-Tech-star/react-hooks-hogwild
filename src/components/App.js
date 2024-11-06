import React, { useState } from "react";
import Nav from "./Nav";
import HogTile from "./HogTile"; 
import hogs from "../porkers_data";
import { Container, Button, Dropdown } from 'semantic-ui-react';

const AddHogForm = ({ addHog }) => {
	const [name, setName] = useState("");
	const [specialty, setSpecialty] = useState("");
	const [weight, setWeight] = useState("");
	const [greased, setGreased] = useState(false);
	const [medal, setMedal] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const newHog = {
			name,
			specialty,
			greased,
			weight: parseFloat(weight),
			"highest medal achieved": medal,
			image: "path/to/default/image.jpg" // You can add logic for images
		};
		addHog(newHog);
		setName("");
		setSpecialty("");
		setWeight("");
		setGreased(false);
		setMedal("");
	};

	return (
		<form onSubmit={handleSubmit} className="add-hog-form">
			<input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
			<input type="text" placeholder="Specialty" value={specialty} onChange={e => setSpecialty(e.target.value)} required />
			<input type="number" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)} required />
			<label>
				Greased:
				<input type="checkbox" checked={greased} onChange={() => setGreased(!greased)} />
			</label>
			<input type="text" placeholder="Highest Medal Achieved" value={medal} onChange={e => setMedal(e.target.value)} />
			<button type="submit">Add Hog</button>
		</form>
	);
};

function App() {
	const [hogsData, setHogsData] = useState(hogs);
	const [sortBy, setSortBy] = useState('name');
	const [showGreased, setShowGreased] = useState(false);
	const [hiddenHogs, setHiddenHogs] = useState([]);

	const filteredHogs = showGreased
		? hogsData.filter(hog => hog.greased)
		: hogsData;

	const sortedHogs = [...filteredHogs].sort((a, b) => {
		if (sortBy === 'name') {
			return a.name.localeCompare(b.name);
		}
		return a.weight - b.weight;
	});

	const toggleGreased = () => {
		setShowGreased(!showGreased);
	};

	const handleSortChange = (e, { value }) => {
		setSortBy(value);
	};

	const toggleHideHog = (hogName) => {
		setHiddenHogs((prevState) =>
			prevState.includes(hogName)
				? prevState.filter(name => name !== hogName)
				: [...prevState, hogName]
		);
	};

	const showAllHiddenHogs = () => {
		setHiddenHogs([]);
	};

	// Function to add a new hog
	function addHog(newHog) {
		setHogsData([...hogsData, newHog]);
	}

	return (
		<div className="App">
			<Nav />
			<Container className="ui grid container">
				{/* Form and Controls Section */}
				<div className="form-controls">
					<AddHogForm addHog={addHog} />
					<div className="controls">
						<Button onClick={toggleGreased}>
							{showGreased ? "Show All Hogs" : "Show Greased Hogs"}
						</Button>
						<Dropdown
							placeholder='Sort By'
							selection
							options={[
								{ key: 'name', text: 'Name', value: 'name' },
								{ key: 'weight', text: 'Weight', value: 'weight' },
							]}
							onChange={handleSortChange}
						/>
						<Button color="green" onClick={showAllHiddenHogs}>
							Show Hidden Hogs
						</Button>
					</div>
				</div>
				{/* Hogs List Section */}
				<div className="hogs-list">
					{sortedHogs.map(hog => 
						!hiddenHogs.includes(hog.name) && (
							<HogTile 
								key={hog.name} 
								hog={hog} 
								toggleHideHog={toggleHideHog} 
								isHidden={hiddenHogs.includes(hog.name)}
							/>
						)
					)}
				</div>
			</Container>
		</div>
	);
}

export default App;
