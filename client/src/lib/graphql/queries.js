/**
 * @description aqui será feito as chamadas através de query e mutation para realizar as chamadas via front end
 */

import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

export async function getJobs() {
  const query = gql`
    query Jobs {
      jobs {
        id
        title
        description
        company {
          id
          name
        }
      }
    }
  `;
  const { jobs } = await client.request(query);
  return jobs;
}

/**
 *
 * @param {*} jobId irá receber o id do job que irá retornar
 * @returns irá retornar o job cadastrado naquele id informado
 */
export async function getJob(jobId) {
  const query = gql`
    query Job($jobId: ID!) {
      job(id: $jobId) {
        id
        description
        title
        company {
          id
          name
          description
        }
        createdAt
      }
    }
  `;
  const { job } = await client.request(query, { jobId });
  return job;
}

export async function getCompany(companyId) {
  const query = gql`
    query Company($companyId: ID!) {
      company(id: $companyId) {
        id
        name
        description
        jobs {
          id
          title
          description
          createdAt
          company {
            name
            id
          }
        }
      }
    }
  `;
  const { company } = await client.request(query, { companyId });
  return company;
}

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const { job } = await client.request(mutation, {
    input: { title, description },
  });
  return job;
}
