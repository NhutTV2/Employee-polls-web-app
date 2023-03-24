let users = {
  sarah_edo: {
    id: 'sarah_edo',
    name: 'Sarah Drasner',
    username: 'sarah_edo',
    password: 'sarah_edo',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    username: 'tylermcginnis',
    password: 'tylermcginnis',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
  },
  dan_abramov: {
    id: 'dan_abramov',
    name: 'Dan Abramov',
    username: 'dan_abramov',
    password: 'dan_abramov',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/dan.jpg',
  },
};

let polls = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    firstQuestion: 'Build our new application with Javascript',
    secondQuestion: 'Build our new applicaton with Typescript',
    author: 'sarah_edo',
    timestamp: 1679452943029,
    answers: [
      { choose: 2, user: 'tylermcginnis' },
      { choose: 1, user: 'dan_abramov' },
    ],
  },
  '5c9qojr2d1738zlx09afby': {
    id: '5c9qojr2d1738zlx09afby',
    firstQuestion: 'Build our new application with Spring',
    secondQuestion: 'Build our new applicaton with Spring Boot',
    author: 'sarah_edo',
    timestamp: 1518122597860,
    answers: [
      { choose: 1, user: 'sarah_edo' },
      { choose: 2, user: 'tylermcginnis' },
    ],
  },
  hbsc73kzqi75rg7v1e0i6a: {
    id: 'hbsc73kzqi75rg7v1e0i6a',
    firstQuestion: 'Build our new service with Java',
    secondQuestion: 'Build our new service with Python',
    author: 'tylermcginnis',
    timestamp: 1518122597860,
    answers: [
      { choose: 1, user: 'sarah_edo' },
      { choose: 1, user: 'tylermcginnis' },
    ],
  },
  '2mb6re13q842wu8n106bhk': {
    id: '2mb6re13q842wu8n106bhk',
    firstQuestion: 'Javascript is the most popular programming language',
    secondQuestion: 'Python is the most popular programming language',
    author: 'dan_abramov',
    timestamp: 1518122597860,
    answers: [
      { choose: 1, user: 'dan_abramov' },
      { choose: 2, user: 'tylermcginnis' },
      { choose: 2, user: 'sarah_edo' },
    ],
  },
  nnvkjqoevs8t02lzcc0ky: {
    id: 'nnvkjqoevs8t02lzcc0ky',
    firstQuestion: 'Build our new UI with React',
    secondQuestion: 'Build our new UI with Angular',
    author: 'sarah_edo',
    timestamp: 1679485709364,
    answers: [
      { choose: 2, user: 'dan_abramov' },
      { choose: 2, user: 'tylermcginnis' },
    ],
  },
};

let authedUser = {};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getPolls() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...polls }), 1000);
  });
}

export function _getAuthedUser() {
  return new Promise((res, rej) => {
    setTimeout(() => res(authedUser), 1000);
  });
}

export function _login(user) {
  authedUser = { ...authedUser, user };
  return new Promise((res, rej) => {
    setTimeout(() => res(user), 0);
  });
}

export function _saveVote({ id, answer }) {
  return new Promise((res, rej) => {
    if (!id || !polls[id]) {
      rej('Can not find poll');
    }

    setTimeout(() => {
      polls = {
        ...polls,
        [id]: {
          ...polls[id],
          answers: polls[id].answers.concat(answer),
        },
      };

      res();
    }, 0);
  });
}

function formatPoll(firstQuestion, secondQuestion, author) {
  return {
    id: generateUID(),
    firstQuestion,
    secondQuestion,
    author,
    timestamp: Date.now(),
    answers: [],
  };
}

export function _savePoll(firstQuestion, secondQuestion, author) {
  return new Promise((res, rej) => {
    if (!firstQuestion || !secondQuestion || !author) {
      rej('The questions and author are required');
    }

    const poll = formatPoll(firstQuestion, secondQuestion, author);

    setTimeout(() => {
      polls = {
        ...polls,
        [poll.id]: poll,
      };

      res(poll);
    }, 500);
  });
}

export function _logout() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      authedUser = {};
      res();
    }, 0);
  });
}
