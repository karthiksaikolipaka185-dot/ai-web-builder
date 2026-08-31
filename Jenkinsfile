pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Frontend Install') {
            steps {
                dir('client') {
                    bat 'npm ci'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('client') {
                    withEnv(['VITE_API_URL=http://localhost:5000/api']) {
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Backend Install') {
            steps {
                dir('server') {
                    bat 'npm ci'
                }
            }
        }

        stage('Backend Validation') {
            steps {
                dir('server') {
                    powershell '''
                        Get-ChildItem -Path . -Recurse -Filter *.js | Where-Object { $_.FullName -notmatch '\\\\node_modules\\\\' } | ForEach-Object {
                            node --check $_.FullName
                            if ($LASTEXITCODE -ne 0) {
                                Write-Error "Syntax validation failed for $($_.FullName)"
                                exit 1
                            }
                        }
                        Write-Output "Backend JavaScript syntax validation passed."
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    bat "docker build -t kksbuild-server:${BUILD_NUMBER ?: 'latest'} ./server"
                }
            }
        }

        stage('Docker Runtime Validation') {
            steps {
                script {
                    bat """
                        docker run --rm kksbuild-server:${BUILD_NUMBER ?: 'latest'} node -e "console.log('Container runtime validated successfully')"
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                bat(script: "docker rmi kksbuild-server:${BUILD_NUMBER ?: 'latest'}", returnStatus: true)
            }
        }
        success {
            echo 'Jenkins Pipeline completed successfully!'
        }
        failure {
            echo 'Jenkins Pipeline failed.'
        }
    }
}
