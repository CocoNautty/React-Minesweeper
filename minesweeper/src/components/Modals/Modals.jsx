import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tabs } from 'antd';
import Accordion from 'react-bootstrap/Accordion';

const seasons = [
    {
        label: 'Winter',
        key: 'winter',
        children: 'Winter is the coldest season of the year in polar and temperate climates. It occurs after autumn and before spring. The tilt of Earth\'s axis causes seasons; winter occurs when a hemisphere is oriented away from the Sun. Different cultures define different dates as the start of winter, and some use a definition based on weather. When it is winter in the Northern Hemisphere, it is summer in the Southern Hemisphere, and vice versa. In many regions, winter brings snow and freezing temperatures.',
    },
    {
        label: 'Spring',
        key: 'spring',
        children: 'Spring, also known as springtime, is one of the four temperate seasons, succeeding winter and preceding summer. There are various technical definitions of spring, but local usage of the term varies according to local climate, cultures and customs. When it is spring in the Northern Hemisphere, it is autumn in the Southern Hemisphere and vice versa. At the spring (or vernal) equinox, days and nights are approximately twelve hours long, with daytime length increasing and nighttime length decreasing as the season progresses until the Summer Solstice in June (Northern Hemisphere) and December (Southern Hemisphere).',
    },
    {
        label: 'Summer',
        key: 'summer',
        children: 'Summer is the hottest of the four temperate seasons, occurring after spring and before autumn. At or centred on the summer solstice, the earliest sunrise and latest sunset occurs, daylight hours are longest and dark hours are shortest, with day length decreasing as the season progresses after the solstice. The date of the beginning of summer varies according to climate, tradition, and culture. When it is summer in the Northern Hemisphere, it is winter in the Southern Hemisphere, and vice versa.',
    },
    {
        label: 'Fall',
        key: 'fall',
        children: 'Autumn, also known as fall in American English and Canadian English,[1] is one of the four temperate seasons. Outside the tropics, autumn marks the transition from summer to winter, in September (Northern Hemisphere) or March (Southern Hemisphere). Autumn is the season when the duration of daylight becomes noticeably shorter and the temperature cools considerably. Day length decreases and night length increases as the season progresses until the Winter Solstice in December (Northern Hemisphere) and June (Southern Hemisphere). One of its main features in temperate climates is the striking change in colour for the leaves of deciduous trees as they prepare to shed.',
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
    return (
        <>
            <h1 variant="primary" onClick={handleShow}>
                MINESWEEPER
            </h1>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Game Records</Modal.Title>
                </Modal.Header>
                <Modal.Body><Tabs defaultActiveKey="1" items={seasons} /></Modal.Body>
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
