import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../../context/GameContextObj';
import { formatTime } from '../../utils/formatTime';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const WinModal = () => {
    const API = 'https://minesweeper.pythonanywhere.com/api/scoreboard/';
    const { state } = useContext(GameContext);
    const { gameStatus, timer, difficulty } = state;
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleClose = () => setShow(false);

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

    // Update modal visibility when game is won
    useEffect(() => {
        if (gameStatus === 'won') {
            setShow(true);
            setName('');
        }
    }, [gameStatus]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>You Win!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Do you want to record your score?</h3>
                <div>Your score is {formatTime(timer)}</div>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Winner Info</legend>
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
