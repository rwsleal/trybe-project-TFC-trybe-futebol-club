import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/Matches';
import { IMatche } from '../interfaces';

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

describe('Matches tests', () => {
  describe('Case a GET request is made to /matches', () => {

    beforeEach(() => {
      sinon.stub(Matches, 'findAll').resolves(matches as IMatche[]);
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
      sinon.stub(Matches, 'findAll').resolves(inProgressMatches as IMatche[]);

      const response = await chai.request(app)
        .get('/matches')

      expect(response.status).to.be.equal(200);

      sinon.restore();
    });

    it('should return an array with only on going matches if query inProgress = true', async () => {
      sinon.stub(Matches, 'findAll').resolves(inProgressMatches as IMatche[]);

      const response = await chai.request(app)
        .get('/matches').query({ inProgress: 'true'})

      expect(response.body).to.be.deep.equal(inProgressMatches)

      sinon.restore();
    });

    it('should return an array with only finished matches if query inProgress = false', async () => {
      sinon.stub(Matches, 'findAll').resolves(finishedMatches as IMatche[]);

      const response = await chai.request(app)
        .get('/matches').query({ inProgress: 'false'})

      expect(response.body).to.be.deep.equal(finishedMatches)

      sinon.restore();
    });    
  })
})