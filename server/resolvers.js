import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
} from "./db/jobs.js";
import { getUser } from "./db/users.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    users: () => getUser(),
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundErro("No Job found with id " + id);
      }
      return job;
    },
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundErro("No company found with id " + id);
      }
      return company;
    },
  },

  Mutation: {
    createJob: (__root, { input: { title, description } }) => {
      const companyId = "FjcJCHJALA4i";
      return createJob({ companyId, title, description });
    },
    deleteJob: (__root, { id }) => deleteJob(id),
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    createdAt: (job) => toIsoDate(job.createdAt),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },
};

function toIsoDate(date) {
  return date.slice(0, "dd-mm-yyyy".length);
}

function notFoundErro(message) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}
