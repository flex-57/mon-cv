<template>
    <div class="container">
        <section class="form">sfsdfsdfsf</section>
        <section class="cv">
            <div class="preview">
                <div class="side profile">
                    <section>
                        <h2>
                            {{ capitalizeName(user.lastname) }}
                            {{ capitalizeName(user.firstname) }}
                        </h2>
                        <ul class="icone-list">
                            <li>
                                <i class="fas fa-cake-candles" style="scale: 1.1"></i
                                >{{ calculateAge(user.birthdate) }} ans
                            </li>
                            <li><i class="fas fa-phone"></i>{{ user.phone }}</li>
                            <li><i class="fas fa-envelope"></i>{{ user.email }}</li>
                            <li>
                                <i class="fab fa-linkedin" style="scale: 1.2"></i>{{ user.email }}
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h3>Compétences Informatiques</h3>
                        <ul>
                            <li>
                                <h4>Front-end:</h4>
                                <p>HTML, CSS, JS, React, Vue, JQuery, Bootstrap</p>
                            </li>
                            <li>
                                <h4>Back-end:</h4>
                                <p>PHP, JAVA, C#, Symfony, API Platform, Apache, IIS</p>
                            </li>
                            <li>
                                <h4>SGBDR:</h4>
                                <p>MySQL/MariaDB, PostgresSQL, SQL Server, Oracle</p>
                            </li>
                            <li>
                                <h4>Outils / IDE:</h4>
                                <p>Notepad++, VS Code, PhpStorm, Eclipse, GitHub, Jira</p>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h3>Langues</h3>
                        <ul>
                            <li><b>Anglais:</b> B2 (bright)</li>
                        </ul>
                    </section>
                    <section>
                        <h3>Points Forts</h3>
                        <ul>
                            <li>Autonomie</li>
                            <li>Rigueur</li>
                            <li>Curiosité</li>
                            <li>Adaptation</li>
                            <li>Persévérance</li>
                        </ul>
                    </section>
                </div>
                <div class="side career">
                    <h2>
                        {{ capitalizeName(user.desiredJob) }}
                    </h2>
                    <section>
                        <h3>Expériences professionnelles</h3>
                        <div>
                            <h4>
                                {{ capitalizeName(user.job) }} | {{ user.start }} / {{ user.end }}
                            </h4>
                            <p>
                                @ {{ capitalizeName(user.company) }},
                                {{ capitalizeName(user.place) }} - {{ user.contract }}
                            </p>
                            <p class="description">{{ user.description }}</p>
                        </div>
                        <div class="experience">
                            <h4>
                                {{ capitalizeName(user.job) }} | {{ user.start }} / {{ user.end }}
                            </h4>
                            <p>
                                @ {{ capitalizeName(user.company) }},
                                {{ capitalizeName(user.place) }} - {{ user.contract }}
                            </p>
                            <p class="description">{{ user.description }}</p>
                        </div>
                    </section>
                    <section>
                        <h3>Formations & Diplômes</h3>
                        <div>
                            <h4>
                                {{ capitalizeName(user.job) }} | {{ user.start }} / {{ user.end }}
                            </h4>
                            <p>
                                @ {{ capitalizeName(user.company) }},
                                {{ capitalizeName(user.place) }} - {{ user.contract }}
                            </p>
                            <p class="description">{{ user.description }}</p>
                        </div>
                        <div class="experience">
                            <h4>
                                {{ capitalizeName(user.job) }} | {{ user.start }} / {{ user.end }}
                            </h4>
                            <p>
                                @ {{ capitalizeName(user.company) }},
                                {{ capitalizeName(user.place) }} - {{ user.contract }}
                            </p>
                            <p class="description">{{ user.description }}</p>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { capitalizeName } from '@/utils/stringUtils'
import { calculateAge } from '@/utils/calculateAgeUtils'
import { computed } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 400px auto;
    padding: 0 1rem;
    height: 100%;
}
.form {
    margin: 1rem 0;
    padding: 1rem;
    border-right: 1px solid #cccccc;
}
.cv {
    display: flex;
    padding: 1rem;
    font-family: 'Calibri';
    font-size: 0.85rem;

    h2 {
        font-size: 1.9rem;
        line-height: 2.6rem;
        border-bottom: 2px solid;
    }

    h3,
    h4 {
        line-height: 1.3rem;
    }

    h3 {
        font-size: 1.35rem;
        text-transform: uppercase;
        border-bottom: 2px solid;
    }
    h4 {
        font-size: 1.15rem;
    }

    .description {
        white-space: pre-wrap;
        text-wrap: wrap;
    }

    .preview {
        background: #fff;
        box-shadow: 0 .5rem .5rem rgba(0, 0, 0, 0.6);
        display: grid;
        grid-template-columns: 32% auto;
        aspect-ratio: 210 / 297;
        max-height: 1050px;

        section {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        .side {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 0.8rem;

            ul {
                display: flex;
                flex-direction: column;
                gap: 0.4rem;

                &.icone-list {
                    list-style: none;
                    margin-left: 0.2rem;

                    li {
                        display: flex;
                        gap: 0.5rem;
                        align-items: baseline;
                        i {
                            display: flex;
                            font-size: 0.8rem;
                            width: 0.8rem;
                        }
                    }
                }
            }
        }

        .profile {
            background: #2d5a75;
            color: #fff;
        }

        .career {
            background: #f3f2eb;

            h2 {
                border: 2px solid #00000060;
                border-radius: 0.3rem;
                text-align: center;
                background: #fff;
            }

            h3 {
                color: #2d5a75;
            }
        }
    }
}
</style>
