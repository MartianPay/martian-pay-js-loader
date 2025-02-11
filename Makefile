# Copyright 2024 Robin Zhong
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

RSYNC			= rsync -avzh --progress --no-owner --no-group --checksum --exclude-from='.gitignore'
RSYNC_OPTS		= -e "ssh -i ~/.ssh/gh"

deploy-test:
	$(RSYNC) $(RSYNC_OPTS) ./ root@100.116.193.52:/data2/martain/fe/loader
	ssh root@100.116.193.52 -i ~/.ssh/gh 'cd /data2/martain/fe/loader && yarn install && yarn build:test && yarn unlink && yarn link'
