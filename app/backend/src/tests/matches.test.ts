import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/Matches';
import { IMatch } from '../interfaces';

chai.use(chaiHttp);

const { expect } = chai;

const matches = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
  {
		"id": 3,
		"homeTeam": 4,
		"homeTeamGoals": 3,
		"awayTeam": 11,
		"awayTeamGoals": 0,
		"inProgress": false,
		"teamHome": {
			"teamName": "Corinthians"
		},
		"teamAway": {
			"teamName": "Napoli-SC"
		}
	},
]

const inProgressMatches = [ matches[1] ];
const finishedMatches = [ matches[0], matches[2] ];

const newMatch = {
  "homeTeam": 16, 
  "awayTeam": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const sameTeams = {
  "homeTeam": 2, 
  "awayTeam": 2, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  + ".eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIn0sImlhdCI6MTY2MDk1MTkzOSwiZXhwIjoxNjYxNTU2NzM5fQ"
  + ".XNXm9La8X42nd3Ij8ycJhVHEwwgnZMuxDCo99EQ4FP4"

describe('Matches tests', () => {
  describe('Case a GET request is made to /matches', () => {

    beforeEach(() => {
      sinon.stub(Matches, 'findAll').resolves(matches as IMatch[]);
    })
  
    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches')

      expect(response.status).to.be.equal(200);
    });

    it('should return an array with all the matches', async () => {
      const response = await chai.request(app)
        .get('/matches')

      expect(response.body).to.be.deep.equal(matches);
    });

    it('should return the properties "teamHome" and "teamAway" inside the matches in the array', async () => {
      const response = await chai.request(app)
        .get('/matches')

      expect(response.body[0]).to.have.ownProperty('teamHome');
      expect(response.body[0]).to.have.ownProperty('teamAway');
      expect(response.body[0].teamHome).to.have.property('teamName')
      expect(response.body[0].teamAway).to.have.property('teamName')

    });
  })

  describe('Case a GET request is made to /matches?inProgress=?', () => {

    it('should return status 200', async () => {
      sinon.stub(Matches, 'findAll').resolves(inProgressMatches as IMatch[]);

      const response = await chai.request(app)
        .get('/matches')

      expect(response.status).to.be.equal(200);

      sinon.restore();
    });

    it('should return an array with only on going matches if query inProgress = true', async () => {
      sinon.stub(Matches, 'findAll').resolves(inProgressMatches as IMatch[]);

      const response = await chai.request(app)
        .get('/matches').query({ inProgress: 'true'})

      expect(response.body).to.be.deep.equal(inProgressMatches)

      sinon.restore();
    });

    it('should return an array with only finished matches if query inProgress = false', async () => {
      sinon.stub(Matches, 'findAll').resolves(finishedMatches as IMatch[]);

      const response = await chai.request(app)
        .get('/matches').query({ inProgress: 'false'})

      expect(response.body).to.be.deep.equal(finishedMatches)

      sinon.restore();
    });    
  })

  describe('Case a POST request is made to /matches to save a match with "inProgress=true"', () => {

    beforeEach(() => {
      sinon.stub(Matches, 'create').resolves({ id:5,...newMatch, inProgress: true} as IMatch);
    })
  
    afterEach(() => {
      sinon.restore();
    });

    it('should return status 201', async () => {
      const response = await chai.request(app)
        .post('/matches').send(newMatch).set('authorization', validToken)

      expect(response.status).to.be.equal(201)
    });
    
    it('should return the saved match case the request was successfull', async () => {
      const response = await chai.request(app)
        .post('/matches').send(newMatch).set('authorization', validToken)

      expect(response.body).to.haveOwnProperty('id')
      expect(response.body).to.haveOwnProperty('homeTeam')
      expect(response.body).to.haveOwnProperty('awayTeam')
      expect(response.body).to.haveOwnProperty('homeTeamGoals')
      expect(response.body).to.haveOwnProperty('awayTeamGoals')
      expect(response.body).to.haveOwnProperty('inProgress')
    });

    it('should not be able to create if the two oposing teams are the same', async () => {
      const response = await chai.request(app)
        .post('/matches').send(sameTeams).set('authorization', validToken)

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    }); 

    it('should not be able to create with an invalid token', async () => {
      const response = await chai.request(app)
        .post('/matches').send(newMatch).set('authorization', 'invalidToken')

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('should not be able to create without a token', async () => {
      const response = await chai.request(app)
        .post('/matches').send(newMatch)

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Token not provided' });
    }); 
  })

  describe('Case a POST request is made to /matches/:id/finish"', () => {

    beforeEach(() => {
      sinon.stub(Matches, 'update').resolves()
    })
  
    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .patch('/matches/2/finish')

      expect(response.status).to.be.equal(200)
    });
    
    it('should return a message', async () => {
      const response = await chai.request(app)
        .patch('/matches/2/finish')

      expect(response.body).to.haveOwnProperty('message')
      expect(response.body.message).to.be.deep.equal('Finished')
    }); 
  })
})