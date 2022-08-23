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
  }
]

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
  })

  describe('Case a GET request is made to /matches?inProgress=true', () => {

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

    it('should return an array with all the matches filtered', async () => {
      const response = await chai.request(app)
        .get('/matches').query({ inProgress: 'true'})

      expect(response.body).to.be.deep.equal(matches[1])
    });
  })
})