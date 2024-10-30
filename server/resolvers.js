import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
  updateJob,
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
    /**
     *
     * @param {*} _root
     * @param {*} input irá trazer os dados do front para adicionar na criação do novo Job
     * @param {*} user = context onde irá trazer a informação se o usuário está logado
     * @returns cria o novo dado na base
     */
    createJob: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError("Missing authentication");
      }
      console.log("[createJob] context: ", user);
      return createJob({ companyId: user.companyId, title, description });
    },
    deleteJob: async (__root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError("Missing authentication");
      }
      const job = await deleteJob(id, user.companyId);
      if (!job) {
        throw notFoundErro("No Job found with id " + id);
      }

      return job;
    },

    updateJob: async (
      __root,
      { input: { id, title, description } },
      { user }
    ) => {
      if (!user) {
        throw unauthorizedError("Missing authentication");
      }
      const job = await updateJob({
        id,
        title,
        description,
        companyId: user.companyId,
      });
      if (!job) {
        throw notFoundErro("No Job found with id " + id);
      }
      return job;
    },
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

function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: { code: "UNAUTHORIZED" },
  });
}
