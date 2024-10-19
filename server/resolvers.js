import { getCompany } from "./db/companies.js"
import { getJobs } from "./db/jobs.js"

export const resolvers = {
    Query: {
        jobs: () => getJobs()
    },

    Job: {
        company: (job) =>{
            return getCompany(job.companyId)
        },
        createdAt: (job) => toIsoDate(job.createdAt)
    }
}

function toIsoDate(date) {
    return date.slice(0, 'dd-mm-yyyy'.length)
}