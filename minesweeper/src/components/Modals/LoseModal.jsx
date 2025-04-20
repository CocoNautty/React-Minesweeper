/**
 * @file LoseModal.jsx
 * @description
 * - Displays a modal dialog when the player loses the game.
 * - Uses Bootstrap's Modal component for styling and interaction.
 * - Reacts to changes in game status via the game context.
 */


import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../../context/GameContextObj';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/**
 * LoseModal component that shows a popup when the game status is 'lost'.
 *
 * - Listens to game status changes via GameContext.
 * - Opens automatically when the player loses.
 * - Can be manually dismissed by the player.
 *
 * @component
 * @returns {JSX.Element} A Bootstrap-styled modal dialog for game over (loss).
 */

const LoseModal = () => {
    const [show, setShow] = useState(false);
    const { state } = useContext(GameContext);
    const { gameStatus } = state;

    /**
     * Closes the modal.
     */

    const handleClose = () => setShow(false);

    /**
     * useEffect hook to show the modal when game is lost.
     */
    
    useEffect(() => {
            if (gameStatus === 'lost') {
                setShow(true);
            }
        }, [gameStatus]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>⛔You Lose!⛔</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>💩Trash!💩</h3>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    I am a failure...
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoseModal;
