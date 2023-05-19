// бібліотеки
import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

//стилізація
import { Container } from './Feedback.styled';

// підключення компонентів
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import PersentageLine from './PersentageLine/PersentageLine';

// компоненти на хуках
export const Feedback = props => {
  const [good, setGood] = useState(props.initialValueGood ?? 0);
  const [neutral, setNeutral] = useState(props.initialValueNeutral ?? 0);
  const [bad, setBad] = useState(props.initialValueBad ?? 0);

  //обробник натискання кнопки
  const handleClick = event => {
    switch (event.currentTarget.value) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  //верстка елементів
  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleClick}
        />
      </Section>
      <Section title="Statistics">
        {good + neutral + bad > 0 ? (
          <>
            <Statistics good={good} neutral={neutral} bad={bad} />
            <PersentageLine good={good} neutral={neutral} bad={bad} />
          </>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
};

// експорт компоненту Feedback, який вставимо, як окремий компонент в App
export default Feedback;

// перевірка проптайпів
Feedback.propTypes = {
  initialValueGood: PropTypes.number,
  initialValueNeutral: PropTypes.number,
  initialValueBad: PropTypes.number,
};
