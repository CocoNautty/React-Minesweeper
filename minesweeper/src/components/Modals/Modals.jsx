import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tabs } from 'antd';
import Accordion from 'react-bootstrap/Accordion';

const seasons = [
    {
        label: 'Winter',
        key: 'winter',
        children: [{name:"player1", score: 100}, {name:"player2", score: 200}, {name:"player3", score: 300}],
    },
    {
        label: 'Spring',
        key: 'spring',
        children: [{name:"player1", score: 100}, {name:"player2", score: 200}, {name:"player3", score: 300}],
    },
    {
        label: 'Summer',
        key: 'summer',
        children: [{name:"player1", score: 100}, {name:"player2", score: 200}, {name:"player3", score: 300}],
    },
    {
        label: 'Fall',
        key: 'fall',
        children: [{name:"player1", score: 100}, {name:"player2", score: 200}, {name:"player3", score: 300}],
    },
];

const Records = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    fetch('https://minesweeper.pythonanywhere.com/api/scoreboard')
        .then((res) => res.json())
        .then((json) => {
        })

    const List = ({ players }) => {
        return (
            <ul>
            {players.map((player, index) => (
                <li key={index}>{player.name}: {player.score}</li>
            ))}
            </ul>
        );
        };

        // Create proper items for Tabs
        const items = seasons.map(season => ({
        ...season,
        children: <List players={season.children} />
        }));

    return (
        <>
            <h1 variant="primary" onClick={handleShow}>
                MINESWEEPER
            </h1>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Game Records</Modal.Title>
                </Modal.Header>
                <Modal.Body><Tabs defaultActiveKey="1" items={items} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Records;
