pipeline {
        agent any
    environment {
        
        dockerImage = ''
    }
    stages{
    
      stage('git checkout'){
      
       steps {
                 
                git credentialsId: 'eed97c7c-25ae-49e8-9fd7-81ee0b9a937a', url: 'https://github.com/pradeep281998/google-authentication.git'
               
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
