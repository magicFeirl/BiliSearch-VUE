<template>
	<div class="text-gray-500 flex items-center justify-center flex-col mt-8 p-2">
		<h2 class="mb-4">我们没有找到你想搜索的关键字 :(，你可以试试：</h2>
		<p v-for="url, name in links" class="mb-4 text-center">
			<i class="el-icon-link"></i><a :href="url + keyword" target="_blank">{{ name }} 搜索: {{ keyword }}</a>
		</p>
	</div>
</template>

<script>
export default {
	props: {
		keyword: String
	},
	computed: {
		links() {
			return {
				'B站': 'https://search.bilibili.com/all?keyword=',
				'Google': 'https://www.google.com/search?q=',
				'Baidu': 'https://www.baidu.com/s?wd='
			}
		}
	}
}
</script>

<style lang="scss" scoped>
</style>