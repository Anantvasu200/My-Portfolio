pipeline {
    agent any

    environment {
        IMAGE_NAME = 'my-portfolio'
        IMAGE_TAG  = 'latest'
        CONTAINER_NAME = 'portfolio-dast-target'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Code clone ho raha hai...'
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Install & Build') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '--user root'
                    reuseNode true
                }
            }
            steps {
                echo '📦 Dependencies install ho rahi hain...'
                sh 'npm install'
                echo '🔨 Project build ho raha hai...'
                sh 'npm run build'
                sh 'ls -la dist/'
            }
        }

        stage('SCA — npm audit') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '--user root'
                    reuseNode true
                }
            }
            steps {
                echo '📦 SCA — dependencies vulnerabilities check...'
                sh 'npm audit --audit-level=high || true'
            }
        }

        stage('Docker Image Build') {
            steps {
                echo '🐳 Docker image build ho rahi hai...'
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker images | grep ${IMAGE_NAME}"
            }
        }

        stage('Container Scan — Trivy') {
            steps {
                echo '🔒 Trivy se image scan ho rahi hai...'
                sh '''
                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      aquasec/trivy:latest image \
                      --severity HIGH,CRITICAL \
                      --exit-code 0 \
                      my-portfolio:latest
                '''
            }
        }

        stage('Run Container for DAST') {
            steps {
                echo '🚀 DAST ke liye container start ho raha hai...'
                sh '''
                    docker stop portfolio-dast-target || true
                    docker rm   portfolio-dast-target || true
                    docker run -d \
                      --name portfolio-dast-target \
                      -p 8081:80 \
                      my-portfolio:latest
                '''
                sh 'sleep 10'
            }
        }

        stage('DAST — OWASP ZAP') {
            steps {
                echo '🌐 OWASP ZAP se live app scan ho rahi hai...'
                sh '''
                    docker run --rm \
                      --network host \
                      ghcr.io/zaproxy/zaproxy:stable \
                      zap-baseline.py \
                      -t http://localhost:8081 \
                      -I || true
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Portfolio deploy ho raha hai...'
                sh '''
                    docker stop portfolio-live || true
                    docker rm   portfolio-live || true
                    docker run -d \
                      --name portfolio-live \
                      -p 80:80 \
                      my-portfolio:latest
                '''
                echo '✅ Portfolio live hai port 80 pe!'
            }
        }
    }

    post {
        always {
            sh 'docker stop portfolio-dast-target || true'
            sh 'docker rm   portfolio-dast-target || true'
        }
        success {
            echo '🎉 Full DevSecOps Pipeline Complete!'
        }
        failure {
            echo '❌ Pipeline fail — console output dekho!'
        }
    }
}