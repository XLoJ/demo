<template>
  <div>
    <div class="columns pb-6">
      <div class="column is-one-fifth">
        <article class="panel">
          <p class="panel-heading">Generators</p>
          <div class="panel-block">
            <b-button expanded type="is-text" @click="createGen"
              >创建 Generator
            </b-button>
          </div>
          <a
            v-for="(generator, index) in generators"
            :key="index"
            :class="[
              'panel-block',
              index === currentGenerator ? 'has-text-weight-bold' : undefined
            ]"
            @click="handleSwitch(index)"
            >{{ index + 1 }}. {{ generator.name }}.{{ generator.language }}</a
          >
        </article>
      </div>
      <div class="column" style="min-height: 525px">
        <div class="buttons">
          <b-select v-model="lang" placeholder="选择语言">
            <option
              v-for="option in LangList"
              :key="option.id"
              :value="option.value"
            >
              {{ option.id }}
            </option>
          </b-select>
          <b-button
            class="mb-0 ml-2"
            type="is-success"
            @click="saveGen(undefined)"
            >保存
          </b-button>
          <b-button class="mb-0" type="is-info" @click="renameGen"
            >重命名
          </b-button>
          <b-button class="mb-0" type="is-danger" @click="removeGen"
            >删除
          </b-button>
          <b-tag type="is-warning" v-show="changed">尚未保存</b-tag>
        </div>
        <Editor v-model="code" :lang="lang"></Editor>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import Editor from '@/components/Editor.vue';
import { LangList } from '@/constants';
import {
  createGenerator,
  removeGenerator,
  updateGenerator
} from '@/service/polygon';
import { b64decode, useDialog, useSnackbar } from '@/utils';

export default defineComponent({
  name: 'EditGenerators',
  components: {
    Editor
  },
  props: {
    problem: Object
  },
  setup(props) {
    const problem = props.problem!;
    const generators = problem.generators;

    const code = ref('');
    const lang = ref('cpp');

    const snackbar = useSnackbar();
    const dialog = useDialog();

    const oldCode = ref('');
    const oldLang = ref('');

    const changed = computed(() => {
      return oldCode.value !== code.value || oldLang.value !== lang.value;
    });

    const currentGenerator = ref(-1);
    const handleSwitch = (index: number) => {
      code.value = b64decode(generators[index].body);
      lang.value = generators[index].language;
      oldCode.value = code.value;
      oldLang.value = lang.value;
      currentGenerator.value = index;
    };
    const createGen = async () => {
      dialog.prompt({
        message: `Generator 文件名？`,
        inputAttrs: {
          placeholder: 'gen',
          maxlength: 16
        },
        trapFocus: true,
        onConfirm: async (name) => {
          for (const generator of generators) {
            if (generator.name === name) {
              snackbar.open({
                message: `Generator 重名 "${name}"`,
                type: 'is-danger'
              });
              return;
            }
          }
          try {
            const generator = await createGenerator(problem.parent, name);
            snackbar.open(
              `题目 ${problem.parent} 成功创建 Generator "${generator.name}.${generator.language}"`
            );

            generators.push(generator);
            handleSwitch(generators.length - 1);
          } catch (err) {
            snackbar.open({
              message: err.message,
              type: 'is-danger'
            });
          }
        }
      });
    };
    const saveGen = async (name: string | undefined) => {
      try {
        const generator = generators[currentGenerator.value];
        const _name = name ?? generator.name;
        const data = await updateGenerator(
          problem.parent,
          generator.id,
          _name,
          code.value,
          lang.value
        );
        snackbar.open(
          `题目 ${problem.parent} 成功更新 Generator "${data.name}.${data.language}"`
        );

        generator.name = data.name;
        generator.body = data.body;
        generator.language = data.language;

        handleSwitch(currentGenerator.value);
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };
    const renameGen = async () => {
      dialog.prompt({
        message: `Generator 文件名？`,
        inputAttrs: {
          placeholder: generators[currentGenerator.value].name,
          maxlength: 16
        },
        trapFocus: true,
        onConfirm: async (name) => {
          await saveGen(name);
        }
      });
    };
    const removeGen = async () => {
      if (currentGenerator.value >= 0) {
        try {
          const generator = generators[currentGenerator.value];
          await removeGenerator(problem.parent, generator.id);
          snackbar.open(
            `题目 ${problem.parent} 成功删除 Generator "${generator.name}.${generator.language}"`
          );

          generators.splice(currentGenerator.value, 1);
          if (generators.length > 0) {
            handleSwitch(0);
          } else {
            generators.value = -1;
            code.value = '';
            oldCode.value = '';
            lang.value = 'cpp';
            oldLang.value = 'cpp';
          }
        } catch (err) {
          snackbar.open({
            message: err.message,
            type: 'is-danger'
          });
        }
      }
    };

    if (generators.length > 0) {
      handleSwitch(0);
    }

    return {
      LangList,
      code,
      lang,
      changed,
      generators,
      currentGenerator,
      handleSwitch,
      createGen,
      saveGen,
      renameGen,
      removeGen
    };
  }
});
</script>
