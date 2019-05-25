<template>

<Fragment>
  <VRuntimeTemplate
    v-for="data in bannerTemplatesData"
    :key="data.id"
    :template="data.temp"
  />
</Fragment>

</template>
<script>

export default {
  data() {
    return {
      imgNames: [ 'tv' ],
      imgAndHerInstancesSizes: ['700', '800', '960'],
    };
  },
  computed: {
    bannerTemplatesData() {
      return this.imgNames.reduce((templatesData, name, i) => {
        templatesData.push({
          temp: `
            <a
              href="##" 
              class="banner"
            >
              <picture>${this.createPictureElChildElementsTemp(i)}</picture>
            </a>
          `,
          id: i,
        });
        return templatesData;
      }, []);
    },
  },
  methods: {
    /*
      Внутри элемента picture динамически создаются элементы с тэгом source
      или img, и все они должны иметь доступ к текущему имени баннера
      при создании баннеров на основе массива с их именами. Это означает,
      что можно было бы сделать v-for для элемента баннера и v-runtime-template
      для source и img из-за того, что они создаются динамически, и передавать
      имя текущего баннера в качестве входного пара метра, но v-runtime-template
      не может иметь входных парамеров кроме template
    */
    createPictureElChildElementsTemp(nameInd) {
      let temp = '';
      for (let i = 0; i <= 2; i++) {
        temp += `
          <${i !== 2 ? 'source' : 'img'}
            :srcset="
              createPictureElChildElSrcsetString(
                imgNames[${nameInd}], ${i} === 0 ? 'webp' : 'jpg'
              )
            "
            ${
              i === 2
                ? `
                  :src="
                    imgUrl(
                      imgNames[${nameInd}],
                      imgAndHerInstancesSizes[
                        imgAndHerInstancesSizes.length - 1
                      ],
                      'jpg'
                    )
                  "
                `
                : ''
            }
            :type="'image/' + (${i} === 0 ? 'webp' : 'jpeg')"
            ${i === 2 ? ' alt=" " ' : ''}
          >
        `;
      }
      return temp;
    },
    createPictureElChildElSrcsetString(imgName, imgExt) {
      const imgAndHerInstancesSizes = this.imgAndHerInstancesSizes;
      return imgAndHerInstancesSizes.reduce((srcsetString, size, i) => {
        const url = `${this.imgUrl(imgName, size, imgExt)} ${size}w`;
          /*
            Подразумевается srcsetString + `...`. Линтер настроен так, что
            конкатенации строк предпочитаются строковые литералы, а этот
            случай исключение, и из-за него отключать правило не стоит
          */
        return `
          ${srcsetString}${
            i !== imgAndHerInstancesSizes.length - 1 ? `${url},` : url
          }
        `;
      }, '');
    },
    imgUrl(imgName, imgSize, imgExt) {
      return require(`@/img/banners/${imgName}-${imgSize}.${imgExt}`);
    },
  },
};

</script>
<style scoped lang="scss">

.banner {
  display: block;

  /deep/ img {
    display: block;
    width: 100%;
  }
}

</style>