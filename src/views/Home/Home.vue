<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div class="container">
      <h4 class="title is-4">XLor Online Judge</h4>
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="box">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="/logo.jpg" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p class="subtitle has-text-weight-bold">欢迎</p>
                  <p>欢迎使用 XLor Online Judge！</p>
                </div>
              </div>
            </article>
          </div>
          <div class="box">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="/icpc.jpg" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p class="subtitle has-text-weight-bold">ICPC 赛事简介</p>
                  <p>
                    ICPC（International Collegiate Programming
                    Contest，国际大学生程序设计竞赛），由 ICPC 基金会（ICPC
                    Foundation）举办，是最具影响力的大学生计算机竞赛。由于以前
                    ACM 赞助这个竞赛，也有很多人习惯叫它 ACM 竞赛。 ICPC
                    主要分为区域赛（Regionals）和总决赛（World Finals）两部分。
                  </p>
                  <p>
                    官网地址：<a href="https://icpc.global"
                      >https://icpc.global</a
                    >
                  </p>
                  <p>
                    选手在比赛时有多次提交机会。比赛实时评测并返回结果（部分比赛可以看到错误的测试样例，如
                    LeetCode），如果提交的结果错误会有罚时，错误次数越多，加罚的时间也越长。每个题目只有在所有数据点全部正确后才能得到分数。比赛排名根据做题数和罚时来评判。
                  </p>
                  <p>赛季赛程：</p>
                  <ol>
                    <li>ICPC 网络赛（8 月底至 9 月初）</li>
                    <li>ICPC 区域赛（9 月底至 11 月底）</li>
                    <li>ICPC EC Final（12 月中旬）</li>
                    <li>ICPC World Finals（次年 4 月至 6 月）</li>
                  </ol>
                </div>
              </div>
            </article>
          </div>
          <div class="box">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="/cse.png" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p class="subtitle has-text-weight-bold">
                    南京理工大学计算机科学与工程学院
                  </p>
                  <p>
                    南京理工大学计算机科学与工程学院始建于1953年创办的哈尔滨军事工程学院模拟计算机研究组，先后经历了炮兵工程学院计算机教研室(1960年)、华东工程学院计算机科学与工程系（1979年）等发展阶段，是我国高等学校中较早建立的计算机系之一。2005年12月更名为计算机科学与技术学院，2012年5月改为现名。2018年6月学校批准成立人工智能学院，与计算机科学与工程学院合署运行。学院下设智能科学与技术系、计算机科学与技术系、软件工程系、数据科学与工程系、网络空间安全系、教育部重点实验室、智能机器人研究所等二级单位。
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content">
              <p class="title is-4">公告牌</p>
              <p class="subtitle is-5">从这里知道你想要的...</p>
              <p>一切工作正常。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Navbar from '../../components/Navbar.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Navbar
  }
});
</script>

<style scoped>
.container {
  margin-top: 2rem;
  margin-bottom: 4rem;
}
</style>
