pipeline {
        agent any
    environment {
        
        dockerImage = ''
    }
    stages{
    
      stage('git checkout'){
      
       steps {
                 
                git branch: 'gauth', credentialsId: 'gitaccid', url: 'https://github.com/BroadSparkDev/tsu-backend.git'
               
            }
            
                
      }
    
    stage('Building our image') {
            steps {
                
                script {

                    
                    dockerImage = docker.build("sample:$env.BUILD_ID")
                }
            }
        }
      
       
            
            
        
      
}
}
