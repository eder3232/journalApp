import { Button } from '@mui/material'
import React, { useState } from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface Props {
  time: number
  interval?: number
}

const AntiClockWhise = ({ time, interval = 0.25 }: Props) => {
  const [percentage, setPercentage] = useState(0)
  const [intervalId, setIntervalId] = useState<any>()

  const timeInSeconds = time * 1000
  const intervalInSeconds = interval * 1000

  function stopInterval() {
    clearInterval(intervalId)
    setIntervalId(0)
  }

  // const interval = 250
  const step = 100 / (timeInSeconds / intervalInSeconds)

  function startClock() {
    const newIntervalId = setInterval(() => {
      setPercentage((prevPercentage) => prevPercentage + step)
    }, intervalInSeconds)

    setIntervalId(newIntervalId)
  }
  if (percentage > 100) {
    stopInterval()
    setPercentage(0)
  }

  return (
    <div>
      <Button onClick={startClock}>Press me!</Button>
      <CircularProgressbar
        value={percentage}
        strokeWidth={50}
        styles={buildStyles({
          strokeLinecap: 'butt',
        })}
      />
    </div>
  )
}

export default AntiClockWhise
