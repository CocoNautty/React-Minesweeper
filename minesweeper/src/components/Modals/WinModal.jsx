import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../../context/GameContextObj';
import { formatTime } from '../../utils/formatTime';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const WinModal = () => {
    const API='https://minesweeper.pythonanywhere.com/api/scoreboard/'
    const { state } = useContext(GameContext);
    const { gameStatus, timer, difficulty } = state;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
    };

    // Update modal visibility when game is won
    useEffect(() => {
        if (gameStatus === 'won') {
            setShow(true);
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
                <form action={API+difficulty.name.toLowerCase()} method="POST">
                    <fieldset>
                        <legend>Winner Info</legend>
                        <label for="name_id">Your Name</label>
                        <input type="text" placeholder="Enter Your Name" id="name_id" name="name" ></input>
                        <input type="submit" value="Record my score"></input>
                    </fieldset>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No, thanks
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WinModal;
