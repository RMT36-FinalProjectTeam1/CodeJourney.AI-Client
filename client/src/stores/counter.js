import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    baseUrl: 'http://localhost:3000',
    // Prompt
    customSchedule: false,
    recommendedSchedule: false,
    prompt: [],
    checklistPrompt: [],
    // Schedule
    schedule: [],
    scheduleDetail: [],
    isFailLoadData: false,
    currentMonth:1
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    async handleLogin(email, password) {
      try {
        let user = await axios({
          url: this.baseUrl + '/login',
          method: 'post',
          data: { email, password }
        })
        localStorage.setItem('access_token', user.data.access_token)
        this.router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    async handleRegister(username, email, password) {
      try {
        let user = await axios({
          url: this.baseUrl + '/register',
          method: 'post',
          data: { username, email, password }
        })
        this.router.push('/login')
      } catch (err) {
        console.log(err)
      }
    },
    handleLogout() {
      localStorage.clear()
      this.router.push('/login')
    },
    handleCustomPrompt(description) {
      this.prompt.push(description)
      this.customSchedule = true
      console.log(this.prompt, 'ISI PROMPT CUSTOM')
    },
    handleRecommendedPrompt(description) {
      this.prompt.push(description)
      this.recommendedSchedule = true
      console.log(this.prompt, 'ISI PROMPT RECOMMENDED')
    },
    handleCheckListPrompt(checklist) {
      this.checklistPrompt = checklist
      console.log(this.checklistPrompt)
      console.log(this.customSchedule, 'INI CUSTOM')
      console.log(this.recommendedSchedule, 'INI RECOMMENDED')
    },
    async fetchSchedule() {
      try {
        let { data: schedule } = await axios({
          url: this.baseUrl + '/schedule',
          method: 'get'
        })
        this.isFailLoadData = false
        this.schedule = schedule
        console.log(schedule[0].month_1)
      } catch (err) {
        this.isFailLoadData = true
        console.log(err)
      }
    },
    async fetchScheduleDetail(id) {
      try {
        let detail = await axios({
          url: this.baseUrl + `/detail/${id}`,
          method: 'get'
        })
        this.isFailLoadData = false
        this.scheduleDetail = detail.data
      } catch (err) {
        this.isFailLoadData = true
        console.log(err)
      }
    },
    async deleteSchedule(id) {
      try {
        const schedule = await axios({
          url: this.baseUrl + `/detail/${id}`,
          method: 'delete',
          headers: { access_token: localStorage.getItem('access_token') }
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
})
