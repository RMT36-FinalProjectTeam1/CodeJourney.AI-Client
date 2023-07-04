import { defineStore } from 'pinia'
import axios from 'axios'
import { notify } from '@kyvg/vue3-notification'
export const useCounterStore = defineStore('counter', {
  state: () => ({
    baseUrl: 'https://codejourneyai.lrizkitegar.site',
    // Prompt
    customSchedule: false,
    recommendedSchedule: false,
    prompt: [],
    checklistPrompt: [],
    tempSchedule:{},
    // Schedule
    schedules: [],
    scheduleDetail: [],
    isFailLoadData: false,
    currentMonth: {},
    lengthMonth: {}
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
        notify({
          title: 'Success',
          text: 'Login Success',
          type: 'success'
        })
        this.router.push('/')
      } catch (err) {
        const { msg } = err.response.data
        notify({
          title: 'Login Failed',
          text: msg,
          type: 'error'
        })
        console.log(msg)
      }
    },
    async handleRegister(username, email, password) {
      try {
        console.log({ username, email, password })
        let user = await axios({
          url: this.baseUrl + '/register',
          method: 'post',
          data: { username, email, password }
        })
        this.router.push('/login')
      } catch (err) {
        const { msg } = err.response.data
        notify({
          title: 'Register Failed',
          text: msg,
          type: 'error'
        })
        console.log(err)
      }
    },
    handleLogout() {
      localStorage.clear()
      this.router.push('/login')
    },
    async handleCustomPrompt(description) {
      // this.prompt.push(description)
      // console.log(description, 'ISI PROMPT CUSTOM')
      try {
        const { data } = await axios({
          url: this.baseUrl + '/generatecustomtask',
          method: 'post',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            prompt: description
          }
        })
        this.tempSchedule = data
        this.customSchedule = true
      } catch (err) {
        const { msg } = err.response.data
        notify({
          title: 'Error Prompting',
          text: msg,
          type: 'error'
        })
        console.log(error)
      }
    },
    handleRecommendedPrompt(description) {
      this.prompt.push(description)
      this.recommendedSchedule = true
      console.log(this.prompt, 'ISI PROMPT RECOMMENDED')
    },
    async postSchedule(schedule) {
      console.log(schedule);
      try {
        const {data} = await axios({
          url:this.baseUrl+'/schedules',
          method:'POST',
          headers:{
            access_token:localStorage.getItem('access_token')
          },
          data:schedule
        })
        notify({
          title: 'Success',
          text: data.msg,
          type: 'success'
        })
        this.router.push('/')
      } catch (error) {
        const { msg } = err.response.data
        notify({
          title: 'Error',
          text: msg,
          type: 'error'
        })
        console.log(error);
      }
    },
    async fetchSchedule() {
      try {
        let { data: schedules } = await axios({
          url: this.baseUrl + '/schedules',
          method: 'get',
          headers:{
            access_token:localStorage.getItem('access_token')
          }
        })
        this.isFailLoadData = false
        this.schedules = schedules
        schedules.forEach((el) => {
          this.currentMonth[el.name] = 0
          this.lengthMonth[el.name] = 0
        })
        console.log(schedules);
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
    }
  }
})
