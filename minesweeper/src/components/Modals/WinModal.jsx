/**
 * @file WinModal.jsx
 * @description
 * - Displays a modal when the player wins the game.
 * - Allows the user to submit their name and score to a scoreboard API.
 * - Uses Bootstrap's Modal and Button components for styling.
 */

import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../../context/GameContextObj';
import { formatTime } from '../../utils/formatTime';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/**
 * WinModal component that pops up when the game status is 'won'.
 *
 * - Shows the player's time.
 * - Provides a form to submit the score with their name.
 * - Sends the score to an external API endpoint based on difficulty.
 *
 * @component
 * @returns {JSX.Element} The modal displayed when the player wins the game.
 */

const WinModal = () => {
    const API = 'https://minesweeper.pythonanywhere.com/api/scoreboard/';
    const { state } = useContext(GameContext);
    const { gameStatus, timer, difficulty } = state;
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    /**
     * Closes the modal.
     */

    const handleClose = () => setShow(false);

    /**
     * Handles the form submission to record a score.
     * Sends a POST request with the player's name and score to the API.
     *
     * @param {React.FormEvent} e - The form submission event.
     */

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Create JSON data object with name and score
        const data = {
            name: name,
            score: timer
        };

        // Send JSON data to API using fetch
        fetch(API + difficulty.name.toLowerCase(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setSubmitting(false);
                handleClose();
            })
            .catch(error => {
                console.error('Error:', error);
                setSubmitting(false);
            });
    };

/**
     * Opens the modal when the game status changes to 'won'.
     */
    
    useEffect(() => {
        if (gameStatus === 'won') {
            setShow(true);
            setName('');
        }
    }, [gameStatus]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>🎉You Win!🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Do you want to record your score?</h3>
                <br></br>
                <div>Your score is {formatTime(timer)}</div>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <label htmlFor="name_id">Your Name</label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            id="name_id"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <br></br>
                        <br></br>
                        <Modal.Footer>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={submitting}
                            >
                                {submitting ? 'Submitting...' : 'Record my score'}
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                No, thanks
                            </Button>
                        </Modal.Footer>

                    </fieldset>
                </form>
            </Modal.Body>

        </Modal>
    );
};

export default WinModal;
