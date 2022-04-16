<template>
    <!-- Modal -->
    <div
        class="modal fade audio_modal"
        :id="`modal${index}`"
        tabindex="-1"
        :aria-labelledby="`modal${index}Label`"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title" :id="`modal${index}Label`">
                        Consumer: {{ feedback.ConsumerName }}
                    </p>
                    <button
                        type="button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        X
                    </button>
                </div>
                <div class="modal-body d-flex justify-content-center">
                    <audio :src="feedback.DownloadUrl" controls></audio>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["feedback", "index"],

    mounted() {
        // console.log(this.feedback);
    },
};
</script>

<style lang="scss" scoped>
.audio_modal .modal-content {
    background: rgba(0, 0, 0, 0.8);

    // .modal-header .btn-close {
    //     color: #fff;
    // }
}
</style>