import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { IMatch, IMatchUpdate } from '../interfaces';

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
]

const homeMatches = [
  { homeTeamGoals: 0, awayTeamGoals: 3 },
  { homeTeamGoals: 2, awayTeamGoals: 3 },
  { homeTeamGoals: 1, awayTeamGoals: 1 }
]

const awayMatches = [
  { homeTeamGoals: 3, awayTeamGoals: 0 },
  { homeTeamGoals: 3, awayTeamGoals: 2 },
  { homeTeamGoals: 1, awayTeamGoals: 1 }
]

const allMatches = [
  {
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    teamHome: { teamName: 'Avaí/Kindermann' },
    teamAway: { teamName: 'Bahia'}
  },
  {
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    teamHome: { teamName: 'Bahia' },
    teamAway: { teamName: 'Avaí/Kindermann'}
  }
]

const homeTeam = {
  "name": "Avaí/Kindermann",
  "totalPoints": 1,
  "totalGames": 3,
  "totalVictories": 0,
  "totalDraws": 1,
  "totalLosses": 2,
  "goalsFavor": 3,
  "goalsOwn": 7,
  "goalsBalance": -4,
  "efficiency": 11.11
}

const allTeamInfo = {
  "name": "Avaí/Kindermann",
  "totalPoints": 2,
  "totalGames": 2,
  "totalVictories": 0,
  "totalDraws": 2,
  "totalLosses": 0,
  "goalsFavor": 4,
  "goalsOwn": 4,
  "goalsBalance": 0,
  "efficiency": 33.33
}



describe('Leaderboard tests', () => {
  describe('Case a request is made to the endpoint GET /leaderboard/home', () => {
    
    beforeEach(() => {
      sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
      sinon.stub(Matches, 'findAll').resolves(homeMatches as IMatchUpdate[])
    })
  
    afterEach(() => {
      sinon.restore();
    });
    
    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/home')

      expect(response.status).to.be.equal(200);
    });

    it('should return each team with their home stats', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/home')

      expect(response.body).to.have.length(2)
      expect(response.body[0]).to.haveOwnProperty('name')
      expect(response.body[0]).to.haveOwnProperty('totalPoints')
      expect(response.body[0]).to.haveOwnProperty('totalGames')
      expect(response.body[0]).to.haveOwnProperty('totalVictories')
      expect(response.body[0]).to.haveOwnProperty('totalDraws')
      expect(response.body[0]).to.haveOwnProperty('totalLosses')
      expect(response.body[0]).to.haveOwnProperty('goalsFavor')
      expect(response.body[0]).to.haveOwnProperty('goalsOwn')
      expect(response.body[0]).to.haveOwnProperty('goalsBalance')
      expect(response.body[0]).to.haveOwnProperty('efficiency')
    });

    it('should return the correct calculation of the stats', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/home')
      
      expect(response.body[0]).to.be.deep.equal(homeTeam);
    });
  })

  describe('Case a request is made to the endpoint GET /leaderboard/away', () => {
    
    beforeEach(() => {
      sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
      sinon.stub(Matches, 'findAll').resolves(awayMatches as IMatchUpdate[])
    })
  
    afterEach(() => {
      sinon.restore();
    });
    
    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/home')

      expect(response.status).to.be.equal(200);
    });

    it('should return each team with their home stats', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/away')

      expect(response.body).to.have.length(2)
      expect(response.body[0]).to.haveOwnProperty('name')
      expect(response.body[0]).to.haveOwnProperty('totalPoints')
      expect(response.body[0]).to.haveOwnProperty('totalGames')
      expect(response.body[0]).to.haveOwnProperty('totalVictories')
      expect(response.body[0]).to.haveOwnProperty('totalDraws')
      expect(response.body[0]).to.haveOwnProperty('totalLosses')
      expect(response.body[0]).to.haveOwnProperty('goalsFavor')
      expect(response.body[0]).to.haveOwnProperty('goalsOwn')
      expect(response.body[0]).to.haveOwnProperty('goalsBalance')
      expect(response.body[0]).to.haveOwnProperty('efficiency')
    });

    it('should return the correct calculation of the stats', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/away')
      
      expect(response.body[0]).to.be.deep.equal(homeTeam);
    });
  })

  describe('Case a request is made to the endpoint GET /leaderboard', () => {
    
    beforeEach(() => {
      sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
      sinon.stub(Matches, 'findAll').resolves(allMatches as IMatchUpdate[])
    })
  
    afterEach(() => {
      sinon.restore();
    });
    
    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/leaderboard')

      expect(response.status).to.be.equal(200);
    });

    it('should return each team with all their stats', async () => {
      const response = await chai.request(app)
        .get('/leaderboard')

      expect(response.body).to.have.length(2)
      expect(response.body[0]).to.haveOwnProperty('name')
      expect(response.body[0]).to.haveOwnProperty('totalPoints')
      expect(response.body[0]).to.haveOwnProperty('totalGames')
      expect(response.body[0]).to.haveOwnProperty('totalVictories')
      expect(response.body[0]).to.haveOwnProperty('totalDraws')
      expect(response.body[0]).to.haveOwnProperty('totalLosses')
      expect(response.body[0]).to.haveOwnProperty('goalsFavor')
      expect(response.body[0]).to.haveOwnProperty('goalsOwn')
      expect(response.body[0]).to.haveOwnProperty('goalsBalance')
      expect(response.body[0]).to.haveOwnProperty('efficiency')
    });

    it('should return the correct calculation of the stats', async () => {
      const response = await chai.request(app)
        .get('/leaderboard')
      
      expect(response.body[0]).to.be.deep.equal(allTeamInfo);
    });
  })
})
