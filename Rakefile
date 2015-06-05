task :build do
  raise unless system "node_modules/.bin/jsx --extension jsx src/ dist/"
end
task :default => :build

task :watch do
  raise unless system "node_modules/.bin/jsx watch --extension jsx src/ dist/"
end
