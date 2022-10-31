<template>
  <div>
    <div class="table-header">
      <slot name="title"></slot>
      <slot name="toolbar"></slot>
    </div>
    <div
      ref="wrapRef"
      class="tableWrap"
      :style="{ height: tableHeight + 40 + 'px' }"
      @wheel="handleWheel"
    >
      <Table ref="scrollTable" v-bind="getBindValues" :rowClassName="getRowClassName"> </Table>
      <!-- 虚拟滚动条 -->
      <div
        class="sc"
        :style="{ height: tableHeight + 'px' }"
        ref="scrollRef"
        @scroll="handleScroll"
      >
        <div class="scbc" :style="{ height: totalHeight + 'px' }"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    ref,
    computed,
    watch,
    toRefs,
    reactive,
    onMounted,
    unref,
    toRaw,
  } from 'vue';
  import { Table } from 'ant-design-vue';
  import { tableProps } from 'ant-design-vue/lib/table';
  export default defineComponent({
    components: {
      Table,
    },
    props: {
      ...tableProps(),
      Theight: {
        type: Number,
        default: 550,
      },
      itemNum: {
        type: Number,
        default: 10,
      },
      striped: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const wrapRef = ref<any>(null);
      const scrollRef = ref<any>(null);
      const scrollTable = ref<any>(null);
      const tableScroll = ref({
        y: 2000,
        scrollToFirstRowOnChange: true,
        x: '100%',
      });

      const tableColums = computed(() => {
        return props.columns;
      });
      const tableDataSource = computed(() => {
        return props.dataSource;
      });
      const tableShowData = computed(() => {
        return tableDataSource?.value?.slice(data.start, data.end);
      });
      const tableHeight = computed(() => {
        return props.Theight;
      });

      const getRowClassName = (_record, index) => {
        return index % 2 === 1 && props.striped ? 'table-striped' : '';
      };

      const getBindValues = computed(() => {
        const dataSource = unref(tableShowData);
        let propsData: Recordable = {
          ...unref(props),
          columns: toRaw(unref(tableColums)),
          dataSource,
          pagination: false,
          scroll: toRaw(unref(tableColums)),
        };

        return propsData;
      });

      const data = reactive({
        itemHeight: 39, // item 高度
        num: 0, // 一屏展示的数据
        start: 0, // 开始索引
        end: 0, // 结束索引
        // tableHeight: 550, // 可视区域高度
        totalHeight: 0, // 总高度
        scrollHeight: 0, // 滚动高度
      });

      watch(
        tableDataSource,
        (newV) => {
          if (wrapRef.value && newV) {
            const length = newV?.length;
            data.totalHeight = data.itemHeight * length;
            // tableScroll.value.y = data.itemHeight * length + 'px';
          }
        },
        { immediate: true },
      );

      watch(
        () => props.itemNum,
        (newV) => {
          data.num = newV;
          data.end = newV;
        },
        { immediate: true },
      );

      // 监听虚拟滚轮变化，计算展示的数据
      const handleScroll = (e) => {
        const { scrollTop, scrollHeight } = e.target;
        if (tableDataSource.value) {
          let lenMax = tableDataSource.value?.length,
            nIdx;

          if (scrollTop === 0) {
            // this.tableData = tableDataSource.value?.slice(0, data.num)
            data.start = 0;
            data.end = data.num;
          } else if (scrollTop === scrollHeight - tableHeight.value) {
            nIdx = lenMax - data.num;
            // this.tableData = tableDataSource.value?.slice(nIdx, nIdx + data.num)
            // data.start = nIdx
            data.start = nIdx;
            data.end = nIdx + data.num;
          } else {
            nIdx = Math.ceil((scrollTop * lenMax) / scrollHeight);
            if (nIdx !== data.start && nIdx <= lenMax - data.num) {
              // this.tableData = tableDataSource.value?.slice(nIdx, nIdx + data.num)
              // data.start = nIdx
              data.start = nIdx;
              data.end = nIdx + data.num;
            }
          }
        }
      };

      const handleWheel = (e) => {
        let y = e.deltaY;
        data.scrollHeight += y;
        scrollRef.value.scrollTop = data.scrollHeight;
      };

      onMounted(() => {});

      return {
        wrapRef,
        scrollRef,
        tableColums,
        tableDataSource,
        tableShowData,
        tableScroll,
        scrollTable,
        getBindValues,
        tableHeight,
        getRowClassName,
        ...toRefs(data),
        handleScroll,
        handleWheel,
      };
    },
  });
</script>
<style lang="less">
  .table-header {
    display: flex;
    justify-content: space-between;
    padding: 5px 8px;
  }

  .tableWrap {
    position: relative;
    max-width: 100%;

    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 8px 8px;
    }

    .ant-table-wrapper {
      .table-striped {
        background-color: #fafafa;
      }
    }

    .sc {
      position: absolute;
      top: 39px;
      right: 0px;
      // width: 16px;
      width: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      background: transparent;
      pointer-events: none;
      .scbc {
        border-radius: 2px;
        // background-color: #f1f1f1;
        background: transparent;
      }
    }
  }
</style>
