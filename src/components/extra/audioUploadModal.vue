<template>
    <!-- data-bs-backdrop="static"
    data-bs-keyboard="false" -->
    <div
        class="modal fade audio_modal"
        :id="`modalUpl${index}`"
        tabindex="-1"
        :aria-labelledby="`modalUpl${index}Label`"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title" :id="`modalUpl${index}Label`">
                        Consumer: {{ feedback.ConsumerName }}
                    </p>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
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
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_modals.scss";
</style>