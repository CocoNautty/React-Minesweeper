import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tabs } from 'antd';

const Records = () => {
    const List = ({ players }) => {
        return (
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name}: {player.score}</li>
                ))}
            </ul>
        );
    };

    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        // Fetch data when the modal is opened
        fetchScoreboard();
    };

    const fetchScoreboard = () => {
        setLoading(true);
        setError(null);

        fetch('https://minesweeper.pythonanywhere.com/api/scoreboard')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((json) => {
                console.log(json);
                const formattedItems = json.map(ranking => ({
                    ...ranking,
                    children: <List players={ranking.children} />
                }));
                setItems(formattedItems);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setError(err.message);
                setLoading(false);
            });
    };

    return (
        <>
            <h1 variant="primary" onClick={handleShow}>
                MINESWEEPER
            </h1>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Game Records</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Loading scoreboard data...</p>
                    ) : error ? (
                        <p>Error loading data: {error}</p>
                    ) : items.length > 0 ? (
                        <Tabs defaultActiveKey="1" items={items} />
                    ) : (
                        <p>No scoreboard data available</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Records;
