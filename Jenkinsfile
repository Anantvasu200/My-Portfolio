pipeline {
    agent any

    environment {
        IMAGE_NAME = 'my-portfolio'
        IMAGE_TAG  = 'latest'
        DEVELOPER_EMAIL = 'ananttatapower@gmail.com'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
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
                sh 'npm install'
                sh 'npm run build'
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
                sh 'npm audit --audit-level=high > npm-audit-report.txt 2>&1 || true'
            }
        }

        stage('Docker Image Build') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Container Scan — Trivy') {
            steps {
                sh """
                    trivy image \
                      --severity HIGH,CRITICAL \
                      --exit-code 0 \
                      --format template \
                      --template "@/usr/local/share/trivy/templates/html.tpl" \
                      --output trivy-report.html \
                      ${IMAGE_NAME}:${IMAGE_TAG} || true

                    trivy image \
                      --severity HIGH,CRITICAL \
                      --exit-code 0 \
                      --output trivy-report.txt \
                      ${IMAGE_NAME}:${IMAGE_TAG} || true
                """
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop portfolio-live || true
                    docker rm   portfolio-live || true
                    docker run -d \
                      --name portfolio-live \
                      -p 80:80 \
                      my-portfolio:latest
                '''
            }
        }
    }

    post {

        always {
            // Publish Trivy HTML report in Jenkins UI
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: '.',
                reportFiles: 'trivy-report.html',
                reportName: 'Trivy Security Report'
            ])

            // Archive reports
            archiveArtifacts artifacts: 'trivy-report.txt, npm-audit-report.txt',
                            allowEmptyArchive: true

            // Cleanup docker (safe)
            sh 'docker system prune -f || true'
        }

        success {
            script {
                def npmReport = ''

                if (fileExists('npm-audit-report.txt')) {
                    npmReport = readFile('npm-audit-report.txt')
                } else {
                    npmReport = 'Report not available'
                }

                emailext(
                    to: "${DEVELOPER_EMAIL}",
                    subject: "✅ Build #${BUILD_NUMBER} SUCCESS — Portfolio DevSecOps",
                    mimeType: 'text/html',
                    attachmentsPattern: 'trivy-report.html, npm-audit-report.txt',
                    body: """
                        <html>
                        <body style='font-family: Arial, sans-serif;'>

                        <h2 style='color:#2ecc71'>
                            ✅ Pipeline Successful — Build #${BUILD_NUMBER}
                        </h2>

                        <table border='1' cellpadding='10' cellspacing='0'
                               style='border-collapse:collapse; width:100%'>
                            <tr style='background:#f2f2f2'>
                                <td><b>Job Name</b></td>
                                <td>${JOB_NAME}</td>
                            </tr>
                            <tr>
                                <td><b>Build Number</b></td>
                                <td>#${BUILD_NUMBER}</td>
                            </tr>
                            <tr style='background:#f2f2f2'>
                                <td><b>Status</b></td>
                                <td style='color:green'><b>SUCCESS ✅</b></td>
                            </tr>
                            <tr>
                                <td><b>Duration</b></td>
                                <td>${currentBuild.durationString}</td>
                            </tr>
                            <tr style='background:#f2f2f2'>
                                <td><b>Build URL</b></td>
                                <td>
                                    <a href='${BUILD_URL}'>${BUILD_URL}</a>
                                </td>
                            </tr>
                        </table>

                        <br>
                        <h3>🔒 Trivy Security Report:</h3>
                        <p>Attached: <b>trivy-report.html</b></p>

                        <br>
                        <h3>📦 npm audit Report:</h3>
                        <pre style='background:#f4f4f4; padding:10px;
                                    border-radius:5px; font-size:12px'>
${npmReport}
                        </pre>

                        <br>
                        <p style='color:#888; font-size:12px'>
                            This is an automated message from Jenkins CI/CD Pipeline.
                        </p>

                        </body>
                        </html>
                    """
                )
            }
        }

        failure {
            emailext(
                to: "${DEVELOPER_EMAIL}",
                subject: "❌ Build #${BUILD_NUMBER} FAILED — Portfolio DevSecOps",
                mimeType: 'text/html',
                body: """
                    <html>
                    <body style='font-family: Arial, sans-serif;'>

                    <h2 style='color:#e74c3c'>
                        ❌ Pipeline Failed — Build #${BUILD_NUMBER}
                    </h2>

                    <p>
                        Check logs here:
                        <a href='${BUILD_URL}console'>View Console Output</a>
                    </p>

                    </body>
                    </html>
                """
            )
        }

        cleanup {
            // FINAL cleanup (after everything)
            cleanWs()
        }
    }
}