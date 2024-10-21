import { getCompany } from "./db/companies.js"
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js"
import { getUser } from "./db/users.js"

export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        users: () => getUser(),
        job: (_root, {id}) => getJob(id),
        company: (_root, {id}) => getCompany(id)
    },

    Job: {
        company: (job) => getCompany(job.companyId),
        createdAt: (job) => toIsoDate(job.createdAt)
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id)
    }
}

function toIsoDate(date) {
    return date.slice(0, 'dd-mm-yyyy'.length)
}