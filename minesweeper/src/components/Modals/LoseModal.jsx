import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../../context/GameContextObj';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const LoseModal = () => {
    const [show, setShow] = useState(false);
    const { state } = useContext(GameContext);
    const { gameStatus } = state;

    const handleClose = () => setShow(false);

    useEffect(() => {
            if (gameStatus === 'lost') {
                setShow(true);
            }
        }, [gameStatus]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>You Win!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>You Lose!</h3>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Bruh...
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoseModal;
