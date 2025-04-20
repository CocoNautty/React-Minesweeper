/**
 * @file Scoreboard.jsx
 * @description
 * - Displays the scoreboard in a modal.
 * - Fetches and renders player rankings from an API.
 * - Includes a list of players with their names and scores (formatted time).
 */

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { formatTime } from '../../utils/formatTime';
import { Tabs } from 'antd';
import styles from './Scoreboard.module.css';

/**
 * Records component displays the leaderboard in a modal.
 *
 * - Fetches player ranking data from an API when the modal is opened.
 * - Renders a list of players with their names and scores (formatted time).
 * - Displays loading state, error state, and message if no data is available.
 *
 * @component
 * @returns {JSX.Element} The rendered scoreboard modal with player rankings.
 */

const Records = () => {

    /**
     * List component renders a list of players and their scores.
     * 
     * @param {Object} props - Component props.
     * @param {Array} props.players - Array of player objects containing name and score.
     * @returns {JSX.Element} A list of players with their names and formatted scores.
     */

    const List = ({ players }) => {
        return (
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="fw-bold">Player</div>
                    <div className="fw-bold">Time</div>
                </li>
                {players.map((player, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>{player.name}</div>
                        <div>{formatTime(player.score)}</div>
                    </li>
                ))}
            </ul>
        );
    };

    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Closes the modal.
     */
    
    const handleClose = () => setShow(false);

    /**
     * Opens the modal and fetches scoreboard data.
     */

    const handleShow = () => {
        setShow(true);
        // Fetch data when the modal is opened
        fetchScoreboard();
    };

    /**
     * Fetches the scoreboard data from the API and updates the state.
     * Handles loading, error, and updates the items state with formatted data.
     */
    
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
                const formattedItems = json.map(ranking => ({
                    ...ranking,
                    children: <List players={ranking.children} />
                }));
                setItems(formattedItems);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    return (
        <>
            <h1 variant="primary" onClick={handleShow} className={styles.title}>
                MINESWEEPER
            </h1>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Leaderboard</Modal.Title>
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
