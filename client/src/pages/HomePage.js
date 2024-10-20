import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import { getJobs } from '../lib/graphql/queries';

function HomePage() {

  /**
   * @description React hoock
   * @param const jobs é a valor atual da nossa variavel
   * @param setJobs irá pegar setar a função que irá fazer o update do dados
   * @method useState com array vazio irá passar o valor inicial
   */
  const [jobs, setJobs] = useState([])
  /**
   * @method useEffect irá ser executada sempre que a pagina foi renderizada
   * @param [] informa para o react que a função será executada apenas um única vez
   */
  useEffect(()=>{
    getJobs().then((jobs)=> setJobs(jobs))
  }, [])

  console.log(
    '[HomePage] jobs:', jobs
  )
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
