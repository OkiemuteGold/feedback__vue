import Vue from "vue";

// import { mapGetters, mapState } from "vuex";

Vue.mixin({
    // computed: {
    //     ...mapGetters(["user", "AppId", "RequestId"]),
    //     ...mapState(["oxfordvestURL"]),
    // },
    methods: {
        resetFeedbackData() {
            Object.assign(this.$data, this.$options.data.apply(this));

            // this.feedbackData = {
            //     cName: "",
            //     cEmail: "",
            //     cPhone: "",
            //     cAddress: "",
            //     date: "",

            //     gender: "",
            //     age: "",

            //     sampleOption: "",
            //     tasteOption: "",
            //     packagingOption: "",
            //     tasteLikeOption: "",
            //     tasteDislikeOption: "",

            //     rad1: "",
            //     rad2: "",
            //     rad3: "",

            //     question1Response: "",
            //     question2Response: ""
            // };
        },

        convertEpochDate(date) {
            let epochDate = date;
            let d = new Date(epochDate);

            let year = d.getFullYear(),
                month = d.getMonth() + 1,
                day = d.getDate(),
                hours = d.getHours(),
                minutes = d.getMinutes(),
                seconds = d.getSeconds();

            let dateOutput = `${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;

            return (this.lastModifiedDate = dateOutput);
        },

        validateSize(fileSize) {
            let stringSize = String(fileSize);

            if (stringSize.length <= 6) {
                fileSize = `
                        ${(fileSize / 1000).toFixed(2)}kb
                    `;
            } else if (stringSize.length > 6) {
                fileSize = `
                        ${(fileSize / 1000 / 1000).toFixed(2)}mb
                    `;
            }
            this.audioSize = fileSize;
        },
    },
});
