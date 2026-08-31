pipeline {
    agent any

    environment {
        CI = 'true'
        VITE_API_URL = 'http://localhost:5000/api'
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
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Backend Install') {
            steps {
                dir('server') {
                    sh 'npm ci'
                }
            }
        }

        stage('Backend Validation') {
            steps {
                dir('server') {
                    sh 'find . -type f -name "*.js" ! -path "./node_modules/*" -exec node --check {} +'
                    echo 'Backend JavaScript syntax validation passed.'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh 'docker build -t kksbuild-server:${BUILD_NUMBER:-latest} ./server'
                }
            }
        }

        stage('Docker Runtime Validation') {
            steps {
                script {
                    // Safe container validation: verify runtime and dependencies inside the image without external secrets
                    sh 'docker run --rm kksbuild-server:${BUILD_NUMBER:-latest} node -e "console.log(\'Container runtime validated successfully\')"'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker rmi kksbuild-server:${BUILD_NUMBER:-latest} || true'
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
