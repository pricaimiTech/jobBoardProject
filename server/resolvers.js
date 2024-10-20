import { getCompany } from "./db/companies.js"
import { getJobs } from "./db/jobs.js"
import { getUser } from "./db/users.js"

export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        users: () => getUser()
    },

    Job: {
        company: (job) => getCompany(job.companyId),
        createdAt: (job) => toIsoDate(job.createdAt)
    },
}

function toIsoDate(date) {
    return date.slice(0, 'dd-mm-yyyy'.length)
}