<template>
  <div id="gitbook-editor">
    <div class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Markdown-Editor</a>
    </div>
    <div id="editor-wrap" class="container my-5">
      <form class="form-inline my-3 px-3">
        File path：
        <input type="text"
          style="width: 50%;"
          class="form-control"
          v-model="title"
          placeholder="Path of .md file(eg. README)"
        />
        <button type="button"
          class="btn btn-primary ml-2"
          @click="getContentAPI"
        >Get</button>
        <button type="button"
          class="btn btn-danger ml-2"
          @click="deleteContentAPI"
        >Delete</button>
      </form>

      <textarea></textarea>

      <div class="text-center">
        <button class="btn btn-success" @click="postContentAPI">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'view-home',

  data() {
    return {
      title: '',
      editor: null,
    };
  },

  computed: {
  },

  methods: {
    ...mapActions('App', [
      'getGitbookContent',
      'postGitbookContent',
      'deleteGitbookContent'
    ]),
    createEditor() {
      this.editor = new SimpleMDE();
    },
    refreshContent() {
      this.title = '';
      this.editor.value('');
    },
    getContentAPI() {
      this.getGitbookContent(this.title)
        .then((res) => {
          if (res.data.msg) return alert(res.data.msg);
          this.editor.value(res.data.content);
        });
    },
    postContentAPI() {
      const vm = this;
      if (this.title === '' || this.editor.value() === '') return alert('Some place is empty');

      const answer = confirm('Make sure you want to update this file?');
      if (answer) {
        const data = {
          path: vm.title,
          content: vm.editor.value()
        };
        vm.postGitbookContent(data).then((res) => {
          if (res.data.msg) return alert(res.data.msg);
          vm.refreshContent();
          alert('File saved successful');
        });
      }
    },
    deleteContentAPI() {
      const vm = this;
      if (vm.title === '') return alert('File path is empty');
      
      const answer = confirm('Make sure you want to delete this file?');
      if (answer) {
        vm.deleteGitbookContent(vm.title).then((res) => {
          if (res.data.msg) return alert(res.data.msg);
          vm.refreshContent();
          alert('File deleted successful');
        });;
      }
    }
  },

  mounted() {
    this.createEditor();
  },
}
</script>

<style lang="scss">

</style>