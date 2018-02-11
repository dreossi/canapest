from setuptools import setup, find_packages

setup(name= 'ai',
		author='Canapest',
		author_email='hello@gmail.com',
		install_requires=[
			'numpy',
			'tensorflow'
		],
		packages= find_packages(),
	)