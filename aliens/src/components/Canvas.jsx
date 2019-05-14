import React from 'react'
import PropTypes from 'prop-types'
import Sky from './Sky'
import Ground from './Ground'
import CannonBase from './CannonBase'
import CannonPipe from './CannonPipe'
import CannonBall from './CannonBall'
import CurrentScore from './CurrentScore'
import FlyingObject from './FlyingObject'
import Heart from './Heart'
import StartGame from './StartGame'
import Title from './Title'

const Canvas = (props) => {
    const gameHeight = 1200
    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight]
    
    return (
        <svg
            id="aliens-canvas"
            /* xMaxYMax  */
            preserveAspectRatio="none"
            onMouseMove = {props.trackMouse}
            viewBox={viewBox}
        >
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" />
                </filter>
            </defs>
            <Sky />
            <Ground />
            <CannonPipe rotation={props.angle} />
            <CannonBase />
            <CannonBall position={{x: 0, y: -100}}/>
            <CurrentScore score={15} />

            { !props.gameState.started &&
                <g>
                <StartGame onClick={() => props.startGame()} />
                <Title />
                </g>
            }

            {props.gameState.flyingObjects.map(flyingObject => (
                <FlyingObject
                    key={flyingObject.id}
                    position={flyingObject.position}
                />
            ))}

            <Heart position={{x: -300, y: 35}} />
            
        </svg>
    )
}

Canvas.propTypes = {
    angle: PropTypes.number.isRequired,
    trackMouse: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        kills: PropTypes.number.isRequired,
        lives: PropTypes.number.isRequired,
        flyingObjects: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            }).isRequired
        })).isRequired
    }).isRequired
}

export default Canvas