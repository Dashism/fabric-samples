/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract } from 'fabric-contract-api';
import { Agent } from './agent';
import { Diploma } from './diploma';
import { Project } from './project';
import { Skill } from './skill';

export class Smartcontract extends Contract {

    public async initLedger(ctx: Context) {
        console.info('============= START : Initialize Ledger ===========');
        const agents: Agent[] = [
            {
                name: 'agent0',
                lastname: 'agent0',
                birthday: '01/01/2010',
                agentcoin: 0,
                entity: 'entity0',
                entitycoin: 0,
                skillList: [],
                projectList: [],
                diplomaList: [],
                username: 'agent0',
                password: 'agent0',
            },
            {
                name: 'agent1',
                lastname: 'agent1',
                birthday: '01/01/2010',
                agentcoin: 0,
                entity: 'entity1',
                entitycoin: 0,
                skillList: [],
                projectList: [],
                diplomaList: [],
                username: 'agent1',
                password: 'agent1',
            },
            {
                name: 'agent2',
                lastname: 'agent2',
                birthday: '01/01/2010',
                agentcoin: 0,
                entity: 'entity2',
                entitycoin: 0,
                skillList: [],
                projectList: [],
                diplomaList: [],
                username: 'agent2',
                password: 'agent2',
            },
            {
                name: 'agent3',
                lastname: 'agent3',
                birthday: '01/01/2010',
                agentcoin: 0,
                entity: 'entity3',
                entitycoin: 0,
                skillList: [],
                projectList: [],
                diplomaList: [],
                username: 'agent3',
                password: 'agent3',
            },
            {
                name: 'agent4',
                lastname: 'agent4',
                birthday: '01/01/2010',
                agentcoin: 0,
                entity: 'entity4',
                entitycoin: 0,
                skillList: [],
                projectList: [],
                diplomaList: [],
                username: 'agent4',
                password: 'agent4',
            },
            {
                name: 'agent5',
                lastname: 'agent5',
                birthday: '01/01/2010',
                agentcoin: 0,
                entity: 'entity5',
                entitycoin: 0,
                skillList: [],
                projectList: [],
                diplomaList: [],
                username: 'agent5',
                password: 'agent5',
            },
            {
                name: 'agent6',
                lastname: 'agent6',
                birthday: '01/01/2010',
                agentcoin: 0,
                entity: 'entity6',
                entitycoin: 0,
                skillList: [],
                projectList: [],
                diplomaList: [],
                username: 'agent6',
                password: 'agent6',
            },
            {
                name: 'agent7',
                lastname: 'agent7',
                birthday: '01/01/2010',
                agentcoin: 0,
                entity: 'entity7',
                entitycoin: 0,
                skillList: [],
                projectList: [],
                diplomaList: [],
                username: 'agent7',
                password: 'agent7',
            },
            {
                name: 'agent8',
                lastname: 'agent8',
                birthday: '01/01/2010',
                agentcoin: 0,
                entity: 'entity8',
                entitycoin: 0,
                skillList: [],
                projectList: [],
                diplomaList: [],
                username: 'agent8',
                password: 'agent8',
            },
            {
                name: 'agent9',
                lastname: 'agent9',
                birthday: '01/01/2010',
                agentcoin: 0,
                entity: 'entity9',
                entitycoin: 0,
                skillList: [],
                projectList: [],
                diplomaList: [],
                username: 'agent9',
                password: 'agent9',
            },
        ];

        for (let i = 0; i < agents.length; i++) {
            await ctx.stub.putState('AGENT' + i, Buffer.from(JSON.stringify(agents[i])));
            console.info('Added <--> ', agents[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    public async queryAgent(ctx: Context, agentNumber: string): Promise<string> {
        const agentAsBytes = await ctx.stub.getState(agentNumber); // get the agent from chaincode state
        if (!agentAsBytes || agentAsBytes.length === 0) {
            throw new Error(`${agentNumber} does not exist`);
        }
        console.log(agentAsBytes.toString());
        return agentAsBytes.toString();
    }

    public async createAgent(ctx: Context, agentNumber: string, name: string, lastname: string, birthday: string, agentcoin: number, entity: string, entitycoin: number, skillList: Skill[], projectList: Project[], diplomaList: Diploma[], username: string, password: string) {
        console.info('============= START : Create Agent ===========');

        const agent: Agent = {
            name,
            lastname,
            birthday,
            agentcoin,
            entity,
            entitycoin,
            skillList,
            projectList,
            diplomaList,
            username,
            password,
        };

        await ctx.stub.putState(agentNumber, Buffer.from(JSON.stringify(agent)));
        console.info('============= END : Create Agent ===========');
    }

    public async queryAllAgents(ctx: Context): Promise<string> {
        const startKey = 'AGENT0';
        const endKey = 'AGENT99';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    public async changeAgent(ctx: Context, agentNumber: string, newname: string, newlastname: string, newbirthday: string, newagentcoin: number, newentity: string, newentitycoin: number, newskillList: Skill[], newprojectList: Project[], newdiplomaList: Diploma[], newusername: string, newpassword: string) {
        console.info('============= START : changeAgent ===========');

        const agentAsBytes = await ctx.stub.getState(agentNumber); // get the car from chaincode state
        if (!agentAsBytes || agentAsBytes.length === 0) {
            throw new Error(`${agentNumber} does not exist`);
        }
        const agent: Agent = JSON.parse(agentAsBytes.toString());
        agent.name = newname;
        agent.lastname = newlastname;
        agent.birthday = newbirthday;
        agent.agentcoin = newagentcoin;
        agent.entity = newentity;
        agent.entitycoin = newentitycoin;
        agent.skillList = newskillList;
        agent.projectList = newprojectList;
        agent.diplomaList = newdiplomaList;
        agent.username = newusername;
        agent.password = newpassword;

        await ctx.stub.putState(agentNumber, Buffer.from(JSON.stringify(agent)));
        console.info('============= END : changeAgent ===========');
    }

}
