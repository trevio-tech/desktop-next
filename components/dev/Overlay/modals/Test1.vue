<template>
  <div class="custom-dialog">
    <div class="custom-dialog-inner">
      <div style="background-color: #fff; padding: 16px; max-width: 320px; box-shadow: 0 0 4px 4px rgba(0,0,0,.4);">
        <header @click="$overlay.hide">Закрыть</header>
        <div @click="onClick" class="details" data-v-bd9b3c35=""><h3 data-v-bd9b3c35="">Tooling</h3> This project is served and bundled with <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite</a>. The recommended IDE setup is <a href="https://code.visualstudio.com/" target="_blank">VSCode</a> + <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>. If you need to test your components and web pages, check out <a href="https://www.cypress.io/" target="_blank">Cypress</a> and <a href="https://on.cypress.io/component" target="_blank">Cypress Component Testing</a>. <br> More instructions are available in Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque doloremque in ipsa itaque, omnis similique! Assumenda debitis doloribus minima neque optio quis quod ullam unde velit veniam! Aperiam dolorum enim et magni, officiis quasi quia repellendus sunt vel voluptate! Amet aperiam assumenda consequatur debitis dignissimos doloremque fugiat ipsa possimus quam reprehenderit? Ab aliquid consectetur cupiditate, deleniti dolorem doloremque ducimus enim est et facilis fugit in libero maxime minima molestiae mollitia, nesciunt nihil odio odit officiis optio perferendis quasi reiciendis rerum sit vero voluptatum? Aliquam aut corporis Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab et explicabo repudiandae totam! Aliquam at labore laborum nostrum odit provident, quam. Accusantium dolorem eius exercitationem illum neque quasi vitae. Accusantium aspernatur at aut debitis delectus dolorem, eligendi, incidunt labore maxime, officiis perspiciatis quibusdam sit. Cumque harum odio quo voluptates voluptatum! Aspernatur cumque deserunt, dignissimos ea eos fuga fugit id impedit ipsum laudantium magnam maiores, nam nemo nobis pariatur perspiciatis quae suscipit tempore temporibus, veniam. Aperiam commodi consequuntur culpa cum doloremque et labore laudantium magni minima, sunt tempora veniam voluptate. Accusamus accusantium ad aliquid amet atque commodi consectetur, distinctio dolores ea eligendi eum illo maxime natus necessitatibus pariatur perferendis quibusdam quo ratione repellat saepe sapiente sit unde vitae voluptates voluptatibus. Aliquid distinctio, est ex explicabo fugit incidunt ipsum laudantium maiores molestiae nam necessitatibus nemo nesciunt nisi nostrum numquam odit omnis placeat possimus quis quod quos repellendus totam ut? Accusamus aperiam architecto assumenda cumque dolor dolorum eaque eius eos fugit, inventore, ipsam iure labore minima natus necessitatibus, nemo nesciunt obcaecati officia officiis omnis provident quia reiciendis repellendus sint tenetur ullam voluptatibus. A cum eos facere incidunt ipsa libero maiores perferendis reiciendis! A ad commodi delectus doloribus enim ex fuga iusto nostrum, optio pariatur perferendis qui quia quisquam rem soluta, tempora, veritatis. Aliquam culpa delectus dicta eligendi explicabo, hic id incidunt ipsum natus neque nobis quaerat repellat rerum similique voluptas? Aliquid eum libero sequi? Asperiores, beatae doloremque, dolores dolorum eius ex explicabo facere ipsam nam, nulla officiis omnis perferendis quas repudiandae saepe suscipit voluptatum. Accusantium aliquid amet animi, asperiores at aut, commodi consectetur consequuntur culpa delectus deleniti deserunt dignissimos eius facere fuga fugit illum in inventore ipsum iure libero nemo non quam quidem, sit ut veniam vero. Accusantium adipisci deserunt ducimus eum modi nemo neque provident qui saepe ut! Ab aliquam beatae corporis eius exercitationem expedita fugiat hic impedit ipsa laborum nesciunt nobis pariatur, placeat possimus praesentium quae quo soluta ullam vel voluptatum! Accusantium adipisci aut autem culpa deleniti enim laborum molestias nam necessitatibus, numquam pariatur quod repellat sed tenetur veritatis. Doloremque illum laboriosam porro quibusdam. Accusantium amet asperiores beatae consequatur cumque delectus dolores doloribus eum eveniet expedita illo iusto modi officiis optio possimus quam quasi sapiente sint suscipit, veniam. Amet architecto aspernatur aut autem blanditiis consequatur corporis, cupiditate earum eius facilis harum impedit ipsum laborum, maxime mollitia nesciunt non pariatur praesentium repellendus, similique? Aliquam amet distinctio enim itaque nesciunt odit reprehenderit! Ab fugiat, impedit nemo nulla ullam voluptas! A ad animi assumenda culpa dignissimos distinctio dolore doloremque ducimus eaque earum eius eligendi error harum, in iste libero magnam nihil nobis non perferendis perspiciatis placeat quam qui quis quod reprehenderit rerum suscipit tempora veritatis vero? A autem commodi ea eaque, eligendi ex hic inventore iure magnam modi necessitatibus nemo nobis officia omnis pariatur quae quidem quis quod recusandae reiciendis repellat reprehenderit, repudiandae similique suscipit velit voluptas voluptatibus. Blanditiis corporis dicta nostrum tempora ut! Aliquid ea recusandae soluta vel voluptatem! Alias aliquid, aperiam delectus enim et iste molestias, obcaecati quis ratione sed sint suscipit!</div>
      </div>
    </div>
  </div>
</template>

<style>
.custom-dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  height: 100%;
}
.custom-dialog-inner {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 12px;
  min-height: 100%;
}
</style>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  methods: {
    onClick() {
      this.$overlay.show(defineAsyncComponent(() => import('~/components/dev/Overlay/modals/SuperModal')), {
        props: {
          testProps: `` + Date.now()
        }
      })
    }
  }
}
</script>