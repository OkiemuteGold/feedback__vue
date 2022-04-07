<template>
    <form id="audioForm" @submit.prevent="submitAudioFeedback()">
        <div class="tab_item">
            <label for="audio">Upload audio</label>
            <input
                type="file"
                name="audio"
                id="audio"
                class="inputs form-control"
                @input="getAudio($event)"
            />

            <p>{{ successMessage }}</p>
        </div>

        <button type="submit" :disabled="!audio" class="btn btn-success">
            Upload Audio
        </button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            audio: null,
            successMessage: "",
        };
    },
    methods: {
        getAudio(event) {
            this.audio = event.target.value;
        },

        submitAudioFeedback() {
            if (this.audio !== null) {
                console.log(this.audio);
                this.successMessage = "Done! Please submit another feedback.";

                setTimeout(() => {
                    this.successMessage = "";
                }, 4000);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#audioForm {
    .tab_item {
        margin-bottom: 1.5rem;
    }

    label {
        margin-bottom: 1rem;
    }

    p {
        color: #fff;
        margin-top: 1rem;
    }
}
</style>